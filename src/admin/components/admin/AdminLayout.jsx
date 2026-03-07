import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  ClipboardList,
  CreditCard,
  Languages,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Percent,
  Plug,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Tags,
  Truck,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/sonner";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { adminApi } from "@/lib/adminApi";
import { cn } from "@/lib/utils";
const formatDate = () => new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric"
}).format(/* @__PURE__ */ new Date());
const formatNotificationTime = (value) => new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
}).format(new Date(value));
const NOTIFICATION_POLL_INTERVAL_MS = 2e4;
const INTEGRATION_STATUS_POLL_INTERVAL_MS = 3e4;
const INTEGRATION_STATUS_EVENT = "admin:integration-settings-updated";
const MODULES_UPDATED_EVENT = "admin:modules-updated";
const LOW_STOCK_THRESHOLD = 10;
const LOW_STOCK_LIMIT = 300;
const MAX_NOTIFICATIONS = 40;
const normalizeStatus = (status) => String(status || "").trim().toLowerCase();
const toOrderLabel = (order) => order.order_number || `#${order.id}`;
const lowStockKey = (item) => {
  const productKey = item.product_id != null ? String(item.product_id) : item.sku || item.name || "product";
  const storeKey = item.store_id != null ? String(item.store_id) : item.store_name || "store";
  return `${productKey}::${storeKey}`;
};
const detectIntegrationProvider = (baseUrl) => {
  const value = String(baseUrl || "").trim().toLowerCase();
  if (!value) return null;
  if (value.includes("wordpress") || value.includes("/wp-json") || value.includes("/wc/v3")) return "WordPress";
  if (value.includes("shopify") || value.includes("myshopify.com")) return "Shopify";
  return null;
};
const buildIntegrationBadgeLabel = (settings) => {
  if (!settings?.is_active) return "Integration Active";
  const explicitName = String(settings.integration_name || "").trim();
  if (explicitName) return `${explicitName} Integration Active`;
  const provider = detectIntegrationProvider(settings.base_url);
  return provider ? `${provider} Integration Active` : "Integration Active";
};
const navSections = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", to: "/admin", icon: LayoutDashboard }]
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", to: "/admin/products", icon: Boxes },
      { title: "Categories", to: "/admin/categories", icon: Tags },
       { title: "Attributes", to: "/admin/attributes", icon: ListFilter },
      { title: "Low Stock", to: "/admin/low-stock", icon: AlertTriangle }
    ]
  },
  {
    label: "Operations",
    items: [
      { title: "Stores", to: "/admin/stores", icon: Store },
      { title: "Orders", to: "/admin/orders/total", icon: ClipboardList, badge: "8" },
      { title: "Shipping", to: "/admin/shipping", icon: Truck },
      { title: "Invoices", to: "/admin/invoices", icon: Receipt }
    ]
  },
  {
    label: "Finance",
    items: [
      { title: "Payments", to: "/admin/payments", icon: CreditCard, badge: "2" },
      { title: "Discounts", to: "/admin/discounts/coupons", icon: Percent },
      { title: "Reports", to: "/admin/reports", icon: BarChart3 }
    ]
  },
  {
    label: "Customers",
    items: [{ title: "Customers", to: "/admin/customers", icon: Users }]
  },
  {
    label: "Platform",
    items: [
      { title: "Integrations", to: "/admin/integrations", icon: Plug },
      { title: "Blogs", to: "/admin/blogs", icon: BookOpen },
      { title: "Languages", to: "/admin/languages", icon: Languages },
      { title: "Settings", to: "/admin/settings", icon: Settings },
      { title: "Admin Security", to: "/admin/security", icon: ShieldCheck }
    ]
  }
];
const navItemModuleKey = {
  "/admin/products": "product",
  "/admin/categories": "product",
  "/admin/attributes": "product",
  "/admin/low-stock": "product",
  "/admin/orders/total": "order",
  "/admin/shipping": "shipping",
  "/admin/invoices": "invoice",
  "/admin/payments": "payment",
  "/admin/discounts/coupons": "discount",
  "/admin/reports": "report",
  "/admin/customers": "customers",
  "/admin/integrations": "integration",
  "/admin/languages": "language",
};
const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const normalizedPath = location.pathname.replace(/\/$/, "");
  const isOrdersSection = normalizedPath.startsWith("/admin/orders");
  const ordersSearchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  }, [location.search]);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [integrationBadgeLabel, setIntegrationBadgeLabel] = useState("Integration Active");
  const [modulesState, setModulesState] = useState({});
  const orderTrackingRef = useRef({
    initialized: false,
    orderIds: /* @__PURE__ */ new Set(),
    orderStatusById: /* @__PURE__ */ new Map()
  });
  const lowStockTrackingRef = useRef({
    initialized: false,
    stockByKey: /* @__PURE__ */ new Map()
  });
  const pushNotification = useCallback((type, title, message) => {
    const next = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title,
      message,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      read: false
    };
    setNotifications((prev) => [next, ...prev].slice(0, MAX_NOTIFICATIONS));
    toast(title, { description: message });
  }, []);
  const pollNotifications = useCallback(async () => {
    try {
      const [ordersResponse, summaryResponse] = await Promise.all([
        adminApi.listOrders(),
        adminApi.getDashboardSummary({ threshold: LOW_STOCK_THRESHOLD, limit: LOW_STOCK_LIMIT })
      ]);
      const orders = Array.isArray(ordersResponse) ? ordersResponse : [];
      const lowStockRows = Array.isArray(summaryResponse?.low_stock_products) ? summaryResponse.low_stock_products : [];
      const orderTracker = orderTrackingRef.current;
      const previousIds = orderTracker.orderIds;
      const previousStatusById = orderTracker.orderStatusById;
      const nextIds = /* @__PURE__ */ new Set();
      const nextStatusById = /* @__PURE__ */ new Map();
      for (const order of orders) {
        const id = Number(order.id);
        if (!Number.isFinite(id)) continue;
        const status = normalizeStatus(order.status);
        nextIds.add(id);
        nextStatusById.set(id, status);
        if (!orderTracker.initialized) continue;
        if (!previousIds.has(id)) {
          const customer = order.customer_name?.trim() || "a customer";
          pushNotification("new_order", "New Order Received", `${toOrderLabel(order)} was placed by ${customer}.`);
          continue;
        }
        const previousStatus = previousStatusById.get(id);
        if (previousStatus && previousStatus !== "cancelled" && status === "cancelled") {
          pushNotification("order_cancelled", "Order Cancelled", `${toOrderLabel(order)} has been cancelled.`);
        }
      }
      const lowStockTracker = lowStockTrackingRef.current;
      const previousStockByKey = lowStockTracker.stockByKey;
      const currentStockByKey = /* @__PURE__ */ new Map();
      const currentRowsByKey = /* @__PURE__ */ new Map();
      for (const row of lowStockRows) {
        const key = lowStockKey(row);
        const qty = Math.max(0, Number(row.stock_left || 0));
        currentStockByKey.set(key, qty);
        currentRowsByKey.set(key, row);
      }
      if (lowStockTracker.initialized) {
        currentStockByKey.forEach((qty, key) => {
          const previousQty = previousStockByKey.get(key);
          const row = currentRowsByKey.get(key);
          const productName = row?.name?.trim() || row?.sku?.trim() || "Product";
          const storeName = row?.store_name?.trim() || "Unknown Store";
          if (qty === 0 && previousQty !== 0) {
            pushNotification("out_of_stock", "Product Out Of Stock", `${productName} is out of stock at ${storeName}.`);
            return;
          }
          if (qty > 0 && qty < LOW_STOCK_THRESHOLD && previousQty == null) {
            pushNotification("low_stock", "Low Stock Alert", `${productName} has only ${qty} units left at ${storeName}.`);
          }
        });
      }
      orderTracker.initialized = true;
      orderTracker.orderIds = nextIds;
      orderTracker.orderStatusById = nextStatusById;
      lowStockTracker.initialized = true;
      lowStockTracker.stockByKey = currentStockByKey;
      setNotificationsError("");
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Failed to refresh notifications");
    } finally {
      setNotificationsLoading(false);
    }
  }, [pushNotification]);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const isActive = (to) => {
    if (to === "/admin") {
      return normalizedPath === "/admin" || normalizedPath === "";
    }
    return normalizedPath.startsWith(to);
  };
  const isNavItemEnabled = useCallback(
    (to) => {
      const key = navItemModuleKey[to];
      if (!key) return true;
      return modulesState[key] !== false;
    },
    [modulesState]
  );
  const visibleNavSections = useMemo(
    () =>
      navSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => isNavItemEnabled(item.to)),
        }))
        .filter((section) => section.items.length > 0),
    [isNavItemEnabled]
  );
  const pollModules = useCallback(async () => {
    try {
      const result = await adminApi.getSystemModules();
      const payload = result?.modules && typeof result.modules === "object" ? result.modules : {};
      setModulesState(payload);
    } catch {
      setModulesState({});
    }
  }, []);
  useEffect(() => {
    void pollNotifications();
    const intervalId = window.setInterval(() => {
      void pollNotifications();
    }, NOTIFICATION_POLL_INTERVAL_MS);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [pollNotifications]);
  useEffect(() => {
    void pollModules();
    const onModulesUpdated = (event) => {
      const payload = event?.detail?.modules;
      if (payload && typeof payload === "object") {
        setModulesState(payload);
        return;
      }
      void pollModules();
    };
    window.addEventListener(MODULES_UPDATED_EVENT, onModulesUpdated);
    return () => {
      window.removeEventListener(MODULES_UPDATED_EVENT, onModulesUpdated);
    };
  }, [pollModules]);
  const pollIntegrationStatus = useCallback(async () => {
    try {
      const settings = await adminApi.getIntegrationSettings();
      setIntegrationBadgeLabel(buildIntegrationBadgeLabel(settings));
    } catch {
      setIntegrationBadgeLabel("Integration Active");
    }
  }, []);
  useEffect(() => {
    void pollIntegrationStatus();
    const intervalId = window.setInterval(() => {
      void pollIntegrationStatus();
    }, INTEGRATION_STATUS_POLL_INTERVAL_MS);
    const onIntegrationStatusUpdated = () => {
      void pollIntegrationStatus();
    };
    window.addEventListener(INTEGRATION_STATUS_EVENT, onIntegrationStatusUpdated);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(INTEGRATION_STATUS_EVENT, onIntegrationStatusUpdated);
    };
  }, [pollIntegrationStatus]);
  useEffect(() => {
    if (!isNotificationsOpen || unreadCount === 0) return;
    setNotifications((prev) => prev.map((item) => item.read ? item : { ...item, read: true }));
  }, [isNotificationsOpen, unreadCount]);
  const handleManualSync = useCallback(async () => {
    try {
      setIsManualSyncing(true);
      const result = await adminApi.manualSync();
      const syncedProducts = Number(result?.synced_products || 0);
      const suffix = syncedProducts === 1 ? "" : "s";
      toast.success("Manual sync completed", {
        description: `${syncedProducts} product${suffix} synced successfully.`
      });
      void pollNotifications();
    } catch (error) {
      toast.error("Manual sync failed", {
        description: error instanceof Error ? error.message : "Unable to run manual sync."
      });
    } finally {
      setIsManualSyncing(false);
    }
  }, [pollNotifications]);
  const handleOrdersSearchChange = useCallback(
    (value) => {
      const params = new URLSearchParams(location.search);
      if (value.trim().length > 0) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      const nextSearch = params.toString();
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : ""
        },
        { replace: true }
      );
    },
    [location.pathname, location.search, navigate]
  );
  return <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-svh w-full items-stretch overflow-hidden">
      <Sidebar className="z-50 h-svh border-r border-border/60 bg-sidebar text-sidebar-foreground" collapsible="icon" variant="inset">
        <SidebarHeader>
          <div className="flex flex-col gap-3 rounded-lg border border-sidebar-border/60 bg-background/70 p-3 transition-all group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2 group-data-[collapsible=icon]:p-2">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="leading-tight group-data-[collapsible=icon]:hidden">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Backoffice</p>
                <p className="font-display text-sm font-semibold">Portugal x Espanha</p>
              </div>
            </div>
            <Badge variant="secondary" className="inline-flex w-fit gap-1 px-2 text-[10px] uppercase tracking-[0.2em] group-data-[collapsible=icon]:hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </Badge>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {visibleNavSections.map((section, sectionIndex) => <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
    asChild
    isActive={isActive(item.to)}
    tooltip={item.title}
    className={cn(
      isActive(item.to) && "bg-sidebar-accent font-semibold",
      item.nested && "pl-8 text-[13px] opacity-90"
    )}
  >
                        <NavLink to={item.to}>
                          <item.icon className="h-4 w-4" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                      {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
              {sectionIndex < visibleNavSections.length - 1 ? <SidebarSeparator /> : null}
            </SidebarGroup>)}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 rounded-lg border border-sidebar-border/60 bg-background/70 p-3 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary group-data-[collapsible=icon]:hidden">
              AO
            </div>
            <div className="flex-1 text-sm group-data-[collapsible=icon]:hidden">
              <p className="font-medium">Admin Owner</p>
              <p className="text-xs text-muted-foreground">admin@ecom.pt</p>
            </div>
            <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8 shrink-0"
    onClick={() => {
      logout();
      navigate("/", { replace: true });
    }}
  >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="min-w-0 h-svh overflow-hidden bg-[#edf0f4] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] before:bg-[size:64px_64px] before:opacity-80 after:pointer-events-none after:absolute after:left-[14%] after:top-0 after:h-[340px] after:w-[52%] after:bg-[rgba(238,229,204,0.72)]">
        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-9 w-auto rounded-md border border-border/70 bg-background/90 px-3 text-sm font-medium shadow-sm hover:bg-secondary">
                  Toggle Sidebar
                </SidebarTrigger>
                <div className="leading-tight">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Overview</p>
                  <p className="font-display text-lg font-semibold">Operations Center</p>
                </div>
                <Badge variant="secondary" className="hidden gap-1 text-[10px] uppercase tracking-[0.2em] md:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {integrationBadgeLabel}
                </Badge>
              </div>
              {isOrdersSection ? <div className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
    className="h-9 w-64 rounded-full pl-9"
    placeholder="Search orders, SKUs, customers"
    value={ordersSearchQuery}
    onChange={(event) => handleOrdersSearchChange(event.target.value)}
  />
                  </div>
                </div> : null}
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted-foreground lg:block">{formatDate()}</span>
                <Button
    variant="outline"
    size="sm"
    className="hidden md:inline-flex"
    onClick={handleManualSync}
    disabled={isManualSyncing}
  >
                  {isManualSyncing ? "Syncing..." : "Manual Sync"}
                </Button>
                <div className="relative">
                  <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative" aria-label="Open notifications">
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 ? <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-black">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span> : null}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="absolute right-0 top-full z-50 mt-2 w-[360px] p-0">
                      <div className="border-b px-4 py-3">
                        <p className="text-sm font-semibold">Notifications</p>
                        <p className="text-xs text-muted-foreground">
                          {notificationsLoading ? "Loading notifications..." : unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                        </p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? <p className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet.</p> : notifications.map((item) => <div
      key={item.id}
      className={cn(
        "border-b px-4 py-3",
        !item.read && "bg-amber-50/50"
      )}
    >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium">{item.title}</p>
                                <span className="shrink-0 text-[11px] text-muted-foreground">
                                  {formatNotificationTime(item.createdAt)}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">{item.message}</p>
                            </div>)}
                      </div>
                      {notificationsError ? <p className="border-t px-4 py-2 text-xs text-destructive">{notificationsError}</p> : null}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 min-h-0 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarInset>
      </div>
    </SidebarProvider>;
};
var stdin_default = AdminLayout;
export {
  stdin_default as default
};
