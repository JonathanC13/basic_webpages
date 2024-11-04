import React from 'react'

const Item = ( {id='', item={}}) => {

  return (
    <section className='item' key={id}>
        <figure className='item__figure'>
            <img src={item['imageRelDir']} alt={item['title']} />
            <figcaption className='offscreen'>{item['title']}</figcaption>
        </figure>
        <article className="item__article article">
            <section className='article__head head'>
                <h3 className='head__h3'>{item['title']}</h3>
                <p className='head__p'>{item['price']}</p>
            </section>
            <section className='article__desc desc'>
                <p className="desc__p">{item['description']}</p>
            </section>
        </article>
    </section>
  )
}

export default Item