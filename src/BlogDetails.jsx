import React from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'

const defaultBlog = {
  id: 'sample-1',
  title: 'TÍTULO DO ARTIGO',
  date: 'Data do artigo',
  heroImage:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  paragraphs: [
    'maximus elit. Ut volutpat. Nunc maximus in gravida nisl. urna. tincidunt turpis eget sit libero, ullamcorper ullamcorper non urna quam non luctus faucibus sed in facilisis non. et tincidunt sollicitudin. enim. sed. placerat.',
    'nisl. convallis. urna. Ut. Nam ullamcorper placerat porti eget amet. non. id. ut sodales. sodales. leo. dui. placerat. Cras nisi luctus. quis nec vitae vitae elit. quis. lobortis. vel viverra. Donec Nunc urna eget ex dui. porta ultrices non venenatis dui in varius nec scelerisque ac lorem. vel ipsum eget elit nec convallis. placerat. hendrerit urna ex lacus, cursus a dui. Nam non sodalesque nec venenatis libero. varius quis libero, leo. Nunc ut porta dui. nibh ipsum tempor in Quisque elit. amet, vehicula, placerat id amet, sit eget viverra leo. lacus Nunc tincidunt lorem. ell lobarcut N non vel luctus volutpat dui nibh ipsum tempor tincidunt sit quis. Ut lobortis. nisi nulla. placerat porta id sit eu nisi nulla. Nunc quis dui. orci ell. non. fringilla luctus sed Vestibulum facilisis sit odio eget non sollicitudin. tortor. urna eu ac id eget nisl. tempor efficitur. vitae est. quis faucibus nibh Vestibulum lacus, ultrices Lorem luctus Donec.',
    'incidunt eu ipsum at Cras venenatis efficitur. vehicula, tempor orci malesuada turpis risus tincidunt ex. Vestibulum nec amet, tortor. vel sit urna. non. quam quis felis, fringilla sit est. convallis. Morbi nibh odio placerat in dui Cras.',
    'id Quisque elit. amet, vehicula, placerat id amet, sit eget viverra leo. lacus Nunc tincidunt lorem. ell lobarcut N non vel luctus volutpat dui nibh ipsum tempor tincidunt sit quis. Ut lobortis. nisi nulla. placerat porta id sit eu nisi nulla. Nunc quis dui. orci ell. non. fringilla luctus sed Vestibulum facilisis sit odio eget non sollicitudin. tortor. urna eu ac id eget nisl. tempor efficitur. vitae est. quis faucibus nibh Vestibulum lacus, ultrices Lorem luctus Donec.',
  ],
}

const BlogDetails = ({ blog = defaultBlog }) => {
  return (
    <>
      <Navbar />

      <section className='bg-white px-5 py-10 font-["Poppins",sans-serif]'>
        <div className='w-[80%] mx-auto max-w-none'>
          <div className='w-full overflow-hidden bg-[#f2f3f6]'>
            <img
              src={blog.heroImage}
              alt={blog.title}
              className='w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover'
            />
          </div>

          <div className='mt-8 max-w-none'>
            <h1 className='m-0 lg:text-[52px] sm:text-[30px] text-[#111] tracking-[0.4px]'>
              {blog.title}
            </h1>
            <p className='mt-2 text-[16px] text-[#8b93a7]'>{blog.date}</p>

            <div className='mt-6 grid gap-4 text-[16px] leading-[1.7] text-[#3c3c3c]'>
              {blog.paragraphs.map((paragraph, index) => (
                <p key={`${blog.id}-p-${index}`} className='m-0'>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BlogDetails
