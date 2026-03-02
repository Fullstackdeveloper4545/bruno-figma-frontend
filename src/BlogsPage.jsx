import React from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import BlogCard from './Components/UI/BlogCard'

const blogPosts = [
  {
    id: 1,
    title: 'Como escolher as sapatilhas ideais',
    date: '5 de Abril',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Como escolher as sapatilhas ideais',
    date: '6 de Abril',
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Como escolher as sapatilhas ideais',
    date: '5 de Abril',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Como escolher as sapatilhas ideais',
    date: '5 de Abril',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Como escolher as sapatilhas ideais',
    date: '5 de Abril',
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Como escolher as sapatilhas ideais',
    date: '5 de Abril',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  },
]

const BlogsPage = () => {
  return (
    <>
      <Navbar />
      <section className='bg-[#efefef] py-12 min-h-[70vh]'>
        <div className='w-[90vw] max-w-[1150px] mx-auto'>
          <h1 className='m-0 text-[42px] font-normal text-black'>Blog</h1>
          <p className='mt-3 mb-8 max-w-[500px] text-[16px] leading-[1.45] text-black/80'>
            Ipsum sit id Morbi est non, dignissim, libero. Donec dolor sed vitae ex laoreet ex
            non, elit lorem, hendrerit amet, elit ex.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10'>
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                title={post.title}
                date={post.date}
                linkText='Ler mais'
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogsPage
