import React from 'react'
import {useStoreState} from 'easy-peasy'
import {FaCircleChevronUp, FaCircleChevronDown} from 'react-icons/fa6'

const Item = ( {id=-1} ) => {

    const item = useStoreState((state) => state.getItemById(id))

  return (
    <>
        {!item && <li></li>}
        {item &&
        <li className='item'>
            <div className='item__div_img itemImg'>
                <img className='itemImg__img' src={item['img']} alt="item img" />
            </div>
            <div className='item__div_info itemInfo'>
                <p className='itemInfo__p itemTitle'>{item['title']}</p>
                <p className='itemInfo__p itemPrice'>{item['price']}</p>
                <button className='itemInfo__btn_remove'>remove</button>
            </div>
            <div className='item__div_amt amt'>
                <div className="amt__div_up">
                    <FaCircleChevronUp></FaCircleChevronUp>
                </div>
                <div className="amt__div_num num">
                    <p className='num__p'>{item['amount']}</p>
                </div>
                <div className="amt__div_down">
                    <FaCircleChevronDown></FaCircleChevronDown>
                </div>
            </div>
        </li>
        }
    </>
  )
}

export default Item