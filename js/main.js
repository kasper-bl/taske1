Vue.component('product', {
    template:`
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock">In stock</p>
            <p v-else
                :class="{ 'line-through': !inStock}"    
            >
                    Out of Stock
                </p>
            <p> {{saleMessage}} </p>
            <product-details :details="details"></product-details>
            <ul>
                <li v-for="size in sizes"> {{ size }}</li>
            </ul>


            <p>Shipping: {{ shipping }}</p>

            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>
            </div>

            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <button v-on:click="deleteToCart">Delete to cart</button>
            <a :href="link">More products like this.</a>
        </div>
        
    </div>`,
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            product: "Socks",
            description: 'A pair of warm, fuzzy socks',
            brand: 'Vue Mastery',
            onSale: false,
            selectedVariant: 0,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            altText: "A pair of socks",
             sizes:['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
           this.$emit('add-to-cart');
        },
        updateProduct(index) {
           this.selectedVariant = index;
           console.log(index);
        },
        deleteToCart(){
            this.cart -= 1
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        saleMessage(){
            if(this.onSale){
                return this.brand + ' ' + this.product + 'is on sale!'
            }else{
                return this.brand + ' ' + this.product + 'is not on sale!'
            }
        }

    }
    
}),

Vue.component('product-details', {
    props:{
        details:{
            type: Array,
            required: true
        }
    },
    template:`
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

let app = new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: 0
   }
})
