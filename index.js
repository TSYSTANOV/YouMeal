let activeId = ''
if(localStorage.getItem('activeTABA'))
{
activeId = localStorage.getItem('activeTABA')
}
else
{
activeId = 'Бургери'
}
let productCart
if(localStorage.getItem('CART'))
{
    productCart = JSON.parse(localStorage.getItem('CART'))
    cartDisplay(productCart)
    sumItems(productCart)
    finalPricing(productCart)
}
else
{
    productCart = []
}
openCart()
closeCart()
// localStorage.clear()
document.querySelector(`[data-item-id='${activeId}']`).classList.add('active_item')
let tabs = document.querySelectorAll('[data-item-id]')
tabs.forEach((el)=>
{
    el.addEventListener('click',()=>
    {
        document.querySelector(`[data-item-id='${activeId}']`).classList.remove('active_item')
        event.target.classList.add('active_item')
        activeId = event.target.dataset.itemId
        localStorage.setItem('activeTABA', activeId)
        renderGoods(activeId,data)
        styleCardVisible()
    })
})
renderGoods(activeId,data)

let btnPrice = document.querySelectorAll('[data-id-price]')
let activeBtn = 'Delete'
document.querySelector(`[data-id-price='${activeBtn}']`).classList.add('greyPrice')
btnPrice.forEach((el)=>
{
  el.style.cursor = `pointer`
  el.addEventListener('click',()=>
  {
  
    if(event.target.dataset.idPrice === 'LowPrice')
    {
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.remove('greyPrice')
      sortByLowPrice(activeId,data)
      activeBtn = 'LowPrice'
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.add('greyPrice')
    }
    else if(event.target.dataset.idPrice === 'HighPrice') {
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.remove('greyPrice')
      sortByHighPrice(activeId,data)
      activeBtn = 'HighPrice'
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.add('greyPrice')
    }
    else{
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.remove('greyPrice')
      if(activeBtn === 'Delete')
      {
      event.preventDefault()
      }
      else
      {
        renderGoods(activeId,data)
        activeBtn = 'Delete'
      }  
      document.querySelector(`[data-id-price='${activeBtn}']`).classList.add('greyPrice')
    }
  })
})

function renderGoods(id,array)
{
    let newArray = JSON.parse(JSON.stringify(array))
    let filterArray = newArray.filter((el)=>
    {
        if(id === el.category)
        {
            return el
        }
        else if(id === 'Все')
        {
          return el
        }
    })
    if(document.querySelector('.cards_items__products'))
    {
    document.querySelector('.cards_items__products').remove()
    }
    let section = document.querySelector('.cards_items_card')
    let title = document.querySelector('.cards_items_title > h2')
    title.innerHTML = id
    let div = document.createElement('div')
    div.className = 'cards_items__products'
    
    for(let i = 0; i < filterArray.length; i++)
    {
        let product = filterArray[i]

        let btn = document.createElement('button')
        btn.textContent = 'Добавить'
        btn.dataset.addToCartBtn = 'true'
        btn.addEventListener('click', addToCart(product))

        let div2 = document.createElement('div')
        div2.className = 'item__product'
        div2.addEventListener('click', modalWindowGood(product.id))
        div2.dataset.inCartGoods = `${product.id}`
        
        div2.innerHTML += `
                  <img src='${product.img}' alt="burger" />
                  <p class="item__product1">${product.price}<span> ₽</span></p>
                  <p class="product_name">${product.name}</p>
                  <p class="product_detail">${product.weight}г</p>
                `
        div2.append(btn)
        div.append(div2)
    }
    
    section.append(div)
    styleCardVisible()
    // 
    setTimeout(()=>{
    document.querySelector('.cards_items__products').style.cssText = `opacity:1;
    transition:0.5s;
    transform:scale(1)`
    },500)
    
}

function sortByLowPrice(id, array)
{
  let newArray = JSON.parse(JSON.stringify(array))
    let filterArray = newArray.filter((el)=>
    {
        if(id === el.category)
        {
            return el
        }
        else if(id === 'Все')
        {
          return el
        }
    })
  filterArray.sort((a,b)=>
  {
    if(a.price < b.price)
    {
      return -1
    }
  })
  if(document.querySelector('.cards_items__products'))
  {
  document.querySelector('.cards_items__products').remove()
  }
  let section = document.querySelector('.cards_items_card')
  let title = document.querySelector('.cards_items_title > h2')
  title.innerHTML = id
  let div = document.createElement('div')
  div.className = 'cards_items__products'
  
  for(let i = 0; i < filterArray.length; i++)
  {
      let product = filterArray[i]

      let btn = document.createElement('button')
      btn.textContent = 'Добавить'
      btn.dataset.addToCartBtn = 'true'
      btn.addEventListener('click', addToCart(product))

      let div2 = document.createElement('div')
      div2.className = 'item__product'
      div2.addEventListener('click', modalWindowGood(product.id))
      div2.dataset.inCartGoods = `${product.id}`
      
      div2.innerHTML += `
                <img src='${product.img}' alt="burger" />
                <p class="item__product1">${product.price}<span> ₽</span></p>
                <p class="product_name">${product.name}</p>
                <p class="product_detail">${product.weight}г</p>
              `
      div2.append(btn)
      div.append(div2)
  }
  
  section.append(div)
  styleCardVisible()
  // 
  setTimeout(()=>{
  document.querySelector('.cards_items__products').style.cssText = `opacity:1;
  transition:0.5s;
  transform:scale(1)`
  },500)
}
function sortByHighPrice(id,array)
{
  let newArray = JSON.parse(JSON.stringify(array))
  let filterArray = newArray.filter((el)=>
  {
      if(id === el.category)
      {
          return el
      }
      else if(id === 'Все')
      {
        return el
      }
  })
filterArray.sort((a,b)=>
{
  if(a.price > b.price)
  {
    return -1
  }
})
if(document.querySelector('.cards_items__products'))
{
document.querySelector('.cards_items__products').remove()
}
let section = document.querySelector('.cards_items_card')
let title = document.querySelector('.cards_items_title > h2')
title.innerHTML = id
let div = document.createElement('div')
div.className = 'cards_items__products'

for(let i = 0; i < filterArray.length; i++)
{
    let product = filterArray[i]

    let btn = document.createElement('button')
    btn.textContent = 'Добавить'
    btn.dataset.addToCartBtn = 'true'
    btn.addEventListener('click', addToCart(product))

    let div2 = document.createElement('div')
    div2.className = 'item__product'
    div2.addEventListener('click', modalWindowGood(product.id))
    div2.dataset.inCartGoods = `${product.id}`
    
    div2.innerHTML += `
              <img src='${product.img}' alt="burger" />
              <p class="item__product1">${product.price}<span> ₽</span></p>
              <p class="product_name">${product.name}</p>
              <p class="product_detail">${product.weight}г</p>
            `
    div2.append(btn)
    div.append(div2)
}

section.append(div)
styleCardVisible()
// 
setTimeout(()=>{
document.querySelector('.cards_items__products').style.cssText = `opacity:1;
transition:0.5s;
transform:scale(1)`
},500)
}

function styleCardVisible()
{
        let items = document.querySelectorAll('.item__product')
        for(let i = 0; i < items.length; i++)
        {
        let a = items[i]
            for(let j = 0; j < productCart.length ; j++)
            {
                if(+a.dataset.inCartGoods === productCart[j].id)
                {
                    document.querySelector(`[data-in-cart-goods='${productCart[j].id}']`).classList.add('active__product__cards')
                    document.querySelector(`[data-in-cart-goods='${+a.dataset.inCartGoods}'] > button`).style.cssText = `background: #ffab08;
                    pointer-events:none`
                }
            }
        }
}

function addToCart(item,numb = 1)
{
    return()=>
    {
      console.log(numb)
        let product = createProduct(item,numb)
        let index = null
        let hasInCart = false

        for(let i = 0; i < productCart.length; i++)
        {
            if(item.id === productCart[i].id)
            {
                index = i
                hasInCart = true
            }
        }
        if(hasInCart)
        {
        productCart[index].count += 1
        }
        else
        {
        productCart.push(product)
        }
        let card = document.querySelector(`[data-in-cart-goods='${product.id}']`)
        card.classList.add('active__product__cards')
        card.querySelector('button').textContent = 'Добавлено'
        document.querySelector(`[data-in-cart-goods='${product.id}'] > button`).style.cssText = `background: #ffab08;
        pointer-events:none`
        localStorage.setItem('CART', JSON.stringify(productCart))
        sumItems(productCart)
        console.log(productCart)
        cartDisplay(productCart)
        if(document.querySelector('.textEmpty'))
        {
            document.querySelector('.textEmpty').remove()
        }
        finalPricing(productCart)
    }
    
}

function createProduct(id,number = 1)
{
    return {
    ...id,
    count:number}
    
}

function sumItems(array)
{
    let sum = 0
    for(let i =0 ; i < array.length; i++)
    {
        sum += array[i].count

    }
    document.querySelector('.totalItems').innerHTML = `${sum}`
}

function cartDisplay(array)
{
    if(document.querySelector('.cartGeneral__content'))
    {
    document.querySelector('.cartGeneral__content').remove()
    }
    let OpenCart = document.querySelector('.cart__open')

    let btnClearCart = document.createElement('button')
    btnClearCart.textContent = 'Очистить'
    btnClearCart.className = 'btn__clear__cart'
    btnClearCart.addEventListener('click', clearAllProductCart)

    let divGen = document.createElement('div')
    divGen.className = 'cartGeneral__content'

    let div = document.createElement('div')
    div.className = 'cart_container_content'

    for(let i = 0; i < array.length; i++)
    {
        let product = array[i]

        let btnMinus = document.createElement('button')
        btnMinus.className = 'minus_number'
        btnMinus.textContent = '-'
        btnMinus.addEventListener('click', changeCountMinus(product.id))
        let btnPlus = document.createElement('button')
        btnPlus.className = 'plus_number'
        btnPlus.textContent = '+'
        btnPlus.addEventListener('click', changeCountPlus(product.id))



        let div2 = document.createElement('div')
        div2.className = 'cart_container_content_card'
        div2.innerHTML = `
        <img src="${product.img}" alt="burger" />
        <div class="card_text">
          <h2>${product.name}</h2>
          <span>${product.weight}г</span>
          <p>${product.price * product.count}<span>₽</span></p>
        </div>
        <div class="card_number">
          <p class='card_number_count' data-count-id='${product.id}'>${product.count}</p>
        </div>`
        div.append(div2)
        div2.querySelector('.card_number').prepend(btnMinus)
        div2.querySelector('.card_number').append(btnPlus)
    }
    divGen.append(div)

    let btnPayFor = document.createElement('button')
    btnPayFor.className = 'cart_container_footer_button'
    btnPayFor.textContent = 'Оформить'
    btnPayFor.addEventListener('click', modalWindowPayFor)

    let div3 = document.createElement('div')
    div3.className = 'cart_container__footer__block'
    div3.innerHTML = `
    <div class="cart_container_footer">
                  <p>Итого</p>
                  <p class='finalPriceItem'>0 <span>₽</span></p>
                </div>
                `
                // <button class="cart_container_footer_button">Оформить</button>
    div3.append(btnPayFor)
    divGen.append(div3)
    divGen.prepend(btnClearCart)
    OpenCart.append(divGen)
}

function openCart()
{
    cartDisplay(productCart)
    
    let btn = document.querySelector('.cart_container_title')
   
    btn.addEventListener('click',()=>
    {btn.style.pointerEvents = 'none'
        if(productCart.length > 0)
    {
         document.querySelector('.cart__open').style.display = `block`  
         if(document.querySelector('.cart__open > .textEmpty'))
         {document.querySelector('.cart__open > .textEmpty').remove()} 
         
         document.querySelector('.cart_container_footer_info').style.display = `flex`
    }
    else{
        document.querySelector('.cart__open').style.display = `block` 
        document.querySelector('.cart_container_footer_button').style.pointerEvents = 'none'
        document.querySelector('.cart_container_footer_button').style.background = 'grey'  
        ////
        document.querySelector('.btn__clear__cart').style.pointerEvents = 'none'
        document.querySelector('.btn__clear__cart').style.background = 'grey'
        ////
        if(document.querySelector('.textEmpty'))
        {
            document.querySelector('.textEmpty').remove()
        }
        else
        {
            let span = document.createElement('span')
            span.className = 'textEmpty'
            span.textContent = 'Корзина пустая!'
            document.querySelector('.cart__open').prepend(span)
        }
        
        document.querySelector('.cart_container_footer_info').style.display = `flex`
    }
    })
}

function closeCart()
{
    let btn = document.querySelector('.cart_container_footer_info > button')
    btn.addEventListener('click',()=>
    {
        document.querySelector('.cart_container_title').style.pointerEvents = ''
        let span = document.createElement('span')
            span.className = 'textEmpty'
            span.textContent = 'Корзина пустая!'
            document.querySelector('.cart__open').prepend(span)
        document.querySelector('.cart__open').style.display = `none`   
        document.querySelector('.cart_container_footer_info').style.display = `none`
    })
}

function changeCountPlus(id)
{
   return ()=>
   {
    for(let i = 0 ; i < productCart.length; i++)
    {
        if(id === productCart[i].id)
        {
            productCart[i].count+=1
            document.querySelector(`[data-count-id='${id}']`).innerHTML = `${productCart[i].count}`
        }
    }
    
    cartDisplay(productCart)
    sumItems(productCart)
    localStorage.setItem('CART', JSON.stringify(productCart))
    console.log(productCart)
    finalPricing(productCart)
   }
}

function changeCountMinus(id)
{
    return ()=>
    {
        for(let i = 0 ; i < productCart.length; i++)
    {
        if(id === productCart[i].id)
        {
            if(productCart[i].count > 0)
            {
            productCart[i].count-=1
            document.querySelector(`[data-count-id='${id}']`).innerHTML = `${productCart[i].count}`
            if(productCart[i].count<1)
            {
            offStyleCart(productCart[i].id)
            }
            productCart = productCart.filter((el)=>
            {
                if(el.count >= 1)
                {
                    return true
                }
            })
            }
        }
    }
 
    openCart()
    cartDisplay(productCart)
    sumItems(productCart)
    localStorage.setItem('CART', JSON.stringify(productCart))
    console.log(productCart)
    
    if(productCart.length <1)
    {
        let span = document.createElement('span')
            span.className = 'textEmpty'
            span.textContent = 'Корзина пустая!'
            document.querySelector('.cart__open').prepend(span)
            document.querySelector('.cart_container_footer_button').style.pointerEvents = 'none'
            document.querySelector('.cart_container_footer_button').style.background = 'grey'
            ///
            document.querySelector('.btn__clear__cart').style.pointerEvents = 'none'
            document.querySelector('.btn__clear__cart').style.background = 'grey' 
    }
    finalPricing(productCart)
    }
}

function offStyleCart(id)
{
    console.log(id)
  
  
    let items = document.querySelectorAll('.item__product')
    for(let i = 0; i < items.length; i++)
    {
            let a = items[i]

    
            if(+a.dataset.inCartGoods === id)
            {
                document.querySelector(`[data-in-cart-goods='${id}']`).classList.remove('active__product__cards')
                document.querySelector(`[data-in-cart-goods='${+a.dataset.inCartGoods}'] > button`).style.cssText = ``
            }

    
}
}

function finalPricing(array)
{
    let sum = null
    if(array.length > 0)
    {
    for(let i = 0; i < array.length; i++)
    {
        sum += array[i].count * array[i].price
    }
    document.querySelector('.finalPriceItem').textContent = `${sum}₽`
    }
    else{
        document.querySelector('.finalPriceItem').textContent = `0 ₽`
    }   
}

function clearAllProductCart()
{
    productCart = []
    localStorage.removeItem('CART')
    cartDisplay(productCart)
    sumItems(productCart)
    let items = document.querySelectorAll('.item__product')
    items.forEach((el)=>
    {
        el.classList.remove('active__product__cards')
        el.querySelector('button').style.cssText = ''
    })
    document.querySelector('.btn__clear__cart').style.pointerEvents = 'none'
    document.querySelector('.btn__clear__cart').style.background = 'grey'  
    ///
    document.querySelector('.cart_container_footer_button').style.pointerEvents = 'none'
    document.querySelector('.cart_container_footer_button').style.background = 'grey'
    ///
    console.log(productCart)

}
let number = 1
function modalWindowGood(id)
{
    return()=>
    { 
        if(event.target.dataset.addToCartBtn === 'true')
        {
            return
        }
    let div = document.createElement('div')
    div.className = 'modal'
    
    div.addEventListener('click', closeModalWindow)

    let div2 = document.createElement('div')
    div2.className = 'modal__card'
    
    let btnCloseModal = document.createElement('button')
    btnCloseModal.className = 'modal-close'
    btnCloseModal.innerHTML = `
    <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5.07422"
                  y="5.28249"
                  width="1"
                  height="20"
                  transform="rotate(-45 5.07422 5.28249)"
                />
                <rect
                  x="5.78125"
                  y="19.4246"
                  width="1"
                  height="20"
                  transform="rotate(-135 5.78125 19.4246)"
                />
              </svg>
    `
    btnCloseModal.addEventListener('click',()=>
    {
    document.querySelector('.modal').remove()
    })

    let product = productCart.find((el)=>
    {
        if(el.id === id)
        {
            return true
        }
    })

    if(product)
    {
        div2.innerHTML = `
        <div class="modal__card-title"><h2>${product.name}</h2></div>
            <div class="modal__card_information">
              <div class="modal_image">
                <img src="${product.img}" alt="burger" />
              </div>
              <div class="modal__card-content">
                <p class="modal__card-content_first">
                ${product.description}
                </p>
                <span class="modal__card-content-inset">Состав:</span>
                <ul>
                  <li>Пшеничная булочка</li>
                  <li>Красный лук</li>
                  <li>Соус сорчичный</li>
                  <li>Листья салата</li>
                  <li>Котлета из говядины</li>
                </ul>
                <span class="modal__card-content-outset">520г, ккал 430</span>
              </div>
              <div class="modal__footer_info">
                <div class="modal__card-footer">
                </div>
                <div class="modal__card-summary">
                  <p>${product.price}<span>₽</span></p>
                </div>
              </div>
            </div>`
    }
    else
    {   
        // let number = 1
        let item = data.find((el)=>
        {
            if(el.id === id)
            {
                return true
            }
        })
      
        let btnAddTocart = document.createElement('button')
        btnAddTocart.className = 'modal__card-footer_button'
        btnAddTocart.textContent = 'Добавить'
        btnAddTocart.addEventListener('click', addToCart(item))

        let divNumber = document.createElement('div')
        divNumber.className = 'card_number'
        divNumber.innerHTML = `<p class='count-modal-window'>1</p>`
        let btnMin = document.createElement('button')
        btnMin.textContent = '-'
        btnMin.addEventListener('click',()=>
        {
            if(number > 1)
            {
              
                number -= 1
              changeCountWindow(number)
        
              btnAddTocart.addEventListener('click', addToCart(item,number))
                // console.log(number)
            }
        })
        let btnMax = document.createElement('button')
        btnMax.textContent = '+'
        btnMax.addEventListener('click',()=>
        {
       
                number += 1
                changeCountWindow(number)
                btnAddTocart.addEventListener('click', addToCart(item,number))
        })
        divNumber.prepend(btnMin)
        divNumber.append(btnMax)

        div2.innerHTML = `
    <div class="modal__card-title"><h2>${item.name}</h2></div>
        <div class="modal__card_information">
          <div class="modal_image">
            <img src="${item.img}" alt="burger" />
          </div>
          <div class="modal__card-content">
            <p class="modal__card-content_first">
            ${item.description}
            </p>
            <span class="modal__card-content-inset">Состав:</span>
            <ul>
              <li>Пшеничная булочка</li>
              <li>Красный лук</li>
              <li>Соус сорчичный</li>
              <li>Листья салата</li>
              <li>Котлета из говядины</li>
            </ul>
            <span class="modal__card-content-outset">520г, ккал 430</span>
          </div>
          <div class="modal__footer_info">
            <div class="modal__card-footer">
            </div>
            <div class="modal__card-summary">
              <p>${item.price}<span>₽</span></p>
            </div>
          </div>
        </div>`
        div2.querySelector('.modal__card-footer').prepend(btnAddTocart)
        div2.querySelector('.modal__card-footer').append(divNumber)
    }
        // div2.querySelector('.modal__card-footer').prepend(btnAddTocart)
        div2.append(btnCloseModal)
        div.append(div2)
        document.querySelector('body').append(div)
        console.log(productCart)
}
}


function closeModalWindow(event)
{
    if(!event.target.closest('.modal__card'))
    {
    document.querySelector('.modal').remove()
    }
}

function modalWindowPayFor()
{
    let div = document.createElement('div')
    div.className = 'modal'
    div.addEventListener('click', closeModalWindow)

    let btnCloseModal = document.createElement('button')
    btnCloseModal.className = 'modal-close'
    btnCloseModal.innerHTML = `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentcolor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.07422"
        y="5.28249"
        width="1"
        height="20"
        transform="rotate(-45 5.07422 5.28249)"
      />
      <rect
        x="5.78125"
        y="19.4246"
        width="1"
        height="20"
        transform="rotate(-135 5.78125 19.4246)"
      />
    </svg>
    `
    btnCloseModal.addEventListener('click',()=>
    {
    document.querySelector('.modal').remove()
    })

    let btnGoToPay = document.createElement('button');
    btnGoToPay.textContent = 'Оформить';
    btnGoToPay.className = 'modal__card-form-button';
    btnGoToPay.addEventListener('click', createClientInfo)


    
    let div2 = document.createElement('div')
    div2.className = 'modal__card modal__card_color'
    
    div2.innerHTML = `
    <div class="modal__card-form-size">
    <div class="modal__card-title__item"><h2>Доставка</h2></div>

    <div class="modal__card-form">
      <div class="modal__card-form-name-phone">
        <form>
          <input data-client-name ='true' type="text" placeholder="Ваше имя" />
          <input maxlength='13' data-client-phone ='true' type="text" placeholder="Телефон +380" />
        </form>
      </div>
      <div class="modal__card-delivery">
        <form>
          <label for="#first"
            ><input data-client-delivery ='true'
              class="radio_input"
              type="radio"
              id="first"
              name="radio_format"
            />
            Самовывоз</label
          >
          <label for="#second"
            ><input data-client-delivery ='true'
              class="radio_input"
              type="radio"
              id="second"
              name="radio_format"
            />
            Доставка</label
          >
        </form>
      </div>
      <div class="modal__card-address">
        <form>
          <input data-client-address ='true' type="text" placeholder="Улица, дом, квартира" />
          <input data-client-address ='true' type="text" placeholder="Этаж" />
          <input data-client-address ='true' type="text" placeholder="Домофон" />
        </form>
      </div>
    </div>
  </div>`
  div2.append(btnGoToPay)

  div2.append(btnCloseModal)
  div.append(div2)
  document.querySelector('body').append(div)
  validateForm()
  document.querySelector(`[data-client-name]`).addEventListener('input',()=>
  {
    validateForm()
  })
  document.querySelector(`[data-client-phone]`).addEventListener('input',()=>
  {
    validateForm()
  }) 

}
let clientInfo = {}
function createClientInfo()
{
 let name = document.querySelector(`[data-client-name]`).value
 let phone = document.querySelector(`[data-client-phone]`).value
 let address = []
 let addr = document.querySelectorAll('[data-client-address]')
 addr.forEach((el)=>
 {
    
    address.push(`${el.placeholder}: ${el.value}`)
 })
 let delivery = 'Не выбрано'
 let del = document.querySelectorAll('[data-client-delivery]')
 del.forEach((el)=>
 {
    if(el.checked)
    {
        delivery = el.parentElement.innerText
    }
    
 })

    clientInfo = 
            {
        name: name ? name: 'Имя не указано',
        phone: phone ? phone: 'Телефон не указан',
        delivery,
        address:address.join(' , '),
        cart:productCart
            }
        
        console.log(clientInfo)
        document.querySelector(`[data-client-name]`).value = '' 
        document.querySelector(`[data-client-phone]`).value = ''
        addr.forEach((el)=>
        {
          el.value = ''
        })
        del.forEach((el)=>
      {
        if(el.checked)
        {
          el.checked = false
        }
 })
 afterPurchase()
}

function validateForm()
{
    if(document.querySelector(`[data-client-name]`).value.length < 1 ||
    document.querySelector(`[data-client-phone]`).value.length < 1 )
    {
    document.querySelector('.modal__card-form-button').style.cssText = `pointer-events:none;
    background-color:grey;`
    }
    else
    {
    document.querySelector('.modal__card-form-button').style.cssText = `pointer-events:auto;
    background-color:'';`
    }
    document.querySelector(`[data-client-phone]`).addEventListener('keydown',()=>
    {

        if(isNaN(event.key) && event.key !== '+' && event.key !== 'Backspace' && event.key !== '-')
        {
  
            event.preventDefault()
        }

    })
    document.querySelector(`[data-client-name]`).addEventListener('keydown',()=>
    {

        if(!isNaN(event.key) && event.key !== '+' && event.key !== 'Backspace' && event.key !== '-')
        {
  
            event.preventDefault()
        }

    })
}
function changeCountWindow(numb)
{
    // console.log(numb)

// console.log(document.querySelector('.count-modal-window'))
document.querySelector('.count-modal-window').textContent = `${numb}`
 

}

function afterPurchase()
{
  setTimeout(()=>
  {
  document.querySelector('.modal').remove()
  },500)
  setTimeout(()=>
  {
  let div = document.createElement('div')
  div.className = 'information'
  div.textContent = 'Спасибо за покупку!'

  let btn = document.createElement('span')
  btn.textContent = 'X'
  btn.addEventListener('click',()=>
  {
    document.querySelector('.information').remove()
    clearAllProductCart()
  })
  div.append(btn)
  document.querySelector('body').append(div)
  },1000)
}
