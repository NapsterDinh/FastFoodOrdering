export const emptyProduct = {
    id: 1,
    name: 'Beef Burger',
    short_description: 'Beef, cheese, potato, onion, fries',
    cover: './bg-burger2.jpg',
    min_price: 9.00,
    option: {
        size : [
            {
                id: 1,
                name: 'Size L',
                sell_price: 9.00
            }
        ],
        ough: [
            {
                id: 1,
                name: 'Day',
                sell_price: 1.00
            }
        ],
        topping: [
            {
                id: 1,
                name: 'Tomato',
                sell_price: 1.00
            }
        ]
    },
    id_category: 1
}