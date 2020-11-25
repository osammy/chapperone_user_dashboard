import dateUtil from '../utils/date';

const user = {
  _id: '5f8b114e3209475509ed6912',
  first_name: 'Samuel',
  last_name: 'Imafidon',
  deliveryInstruction: 'Leave it in my front porch',
};

const users = [
  {
    _id: '5f8b114e3209475509ed6912',
    houseNumber: 1,
    first_name: 'Max',
    last_name: 'Beard',
    supplier: false,
    deliveryInstruction:
      'I may not be around by the time you get here, please do well to inform me.',
    profileImage: 'https://randomuser.me/api/portraits/men/30.jpg',
  },
  {
    _id: '5f8b114e3209475509ed6913',
    houseNumber: 7,
    first_name: 'Timi',
    last_name: 'Obisesan',
    supplier: false,
    deliveryInstruction: '',
    profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    id: '5f8b114e3209475509ed6914',
    houseNumber: 3,
    first_name: 'Rod',
    last_name: 'Parsley',
    supplier: false,
    deliveryInstruction: '',
    profileImage: 'https://randomuser.me/api/portraits/men/49.jpg',
  },
  {
    id: '5f8b114e3209475509ed6915',
    houseNumber: 17,
    first_name: 'Maggie',
    last_name: 'Ezeh',
    supplier: false,
    deliveryInstruction: '',
    profileImage: 'https://randomuser.me/api/portraits/women/49.jpg',
  },

  {
    id: '5f8b114e3209475509ed6915',
    houseNumber: 17,
    first_name: 'Katie',
    last_name: 'Bamford',
    supplier: false,
    deliveryInstruction: 'Leave at the front porch',
    profileImage: 'https://randomuser.me/api/portraits/women/77.jpg',
  },
  {
    id: '5f8b114e3209475509ed6915',
    houseNumber: 17,
    first_name: 'Maria',
    last_name: 'Carie',
    supplier: false,
    deliveryInstruction: 'Leave at the door',
    profileImage: 'https://randomuser.me/api/portraits/women/87.jpg',
  },
];

const productMocks = [
  {
    _id: 1,
    name: 'Burger King with juicy stake',
    supplier: {
      _id: 1233,
      first_name: 'Samuel',
      last_name: 'Imafidon',
      profileImage:
        'https://media-exp1.licdn.com/dms/image/C4D03AQF5DQdieHQ6TA/profile-displayphoto-shrink_400_400/0?e=1609372800&v=beta&t=iN6PUhYBfNPnAFJ8qt33hw9_-Do_zMb6SJc7H1utcI4',
      rating: 4.5,
    },
    currentDeliveryCycle: {
      _id: 172787,
      status: 'Pending',
      deliveryDays: 3,
      expectedDeliveryDate: dateUtil.addDays(new Date(), 7),
      itinerary: [
        {
          label: 'Order Waiting',
          complete: true,
        },
        {
          label: 'Order Processing',
          complete: false,
        },
        {
          label: 'Order Delivered',
          complete: false,
        },
      ],
      buyers: [
        '5f8b114e3209475509ed6912',
        '5f8b114e3209475509ed6913',
        '5f8b114e3209475509ed6914',
        '5f8b114e3209475509ed6915',
      ],
      orders: [],
      deliveryInfo: {
        deliveryAddress: '3 Freemont street, London.',
        customer: '5f8b114e3209475509ed6912',
      },
    },
    location: 'London, United Kingdom',
    temperature: 534,
    amount: 5000,
    description:
      'Some of the best cheese you will ever taste. Its up for subscription guys',
    rating: 4.3,
    reviews: 3212,
    preview:
      'https://parkfarm.co.uk/wp-content/uploads/2019/11/Bountiful-Bull-450x450.jpg',
    //   'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://miro.medium.com/max/1200/1*pIJH1mPega8583Y3NuPaLg.jpeg',
      'https://www.trendrr.net/wp-content/uploads/2017/04/Lavazza.jpg',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    _id: 2,
    name: 'Cackle Bean Eggs',
    supplier: {
      _id: 4533,
      first_name: 'Samuel',
      last_name: 'Imafidon',
      profileImage:
        'https://media-exp1.licdn.com/dms/image/C4D03AQF5DQdieHQ6TA/profile-displayphoto-shrink_400_400/0?e=1609372800&v=beta&t=iN6PUhYBfNPnAFJ8qt33hw9_-Do_zMb6SJc7H1utcI4',
      rating: 4.5,
    },
    currentDeliveryCycle: {
      _id: 172787,
      status: 'Pending',
      deliveryDays: 3,
      expectedDeliveryDate: dateUtil.addDays(new Date(), 7),
      itinerary: [
        {
          label: 'Order Waiting',
          complete: true,
        },
        {
          label: 'Order Processing',
          complete: false,
        },
        {
          label: 'Order Delivered',
          complete: false,
        },
      ],
      buyers: [
        '5f8b114e3209475509ed6912',
        '5f8b114e3209475509ed6913',
        '5f8b114e3209475509ed6914',
        '5f8b114e3209475509ed6915',
      ],
      orders: [],
      deliveryInfo: {
        deliveryAddress: '3 Freemont street, London.',
        customer: '5f8b114e3209475509ed6912',
      },
    },
    location: 'Loutraki, Greece',
    description: 'Your favourite soda, for everyday consumption',
    rating: 4.6,
    reviews: 3212,
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    _id: 3,
    name: "Good o'l Cheese",
    supplier: {
      _id: 4733,
      first_name: 'Max',
      last_name: 'Beard',
      profileImage: 'https://randomuser.me/api/portraits/men/30.jpg',
      rating: 4.5,
    },
    currentDeliveryCycle: {
      _id: 178807,
      status: 'Pending',
      deliveryDays: 5,
      expectedDeliveryDate: dateUtil.addDays(new Date(), 7),
      itinerary: [
        {
          label: 'Order Waiting',
          complete: true,
        },
        {
          label: 'Order Processing',
          complete: false,
        },
        {
          label: 'Order Delivered',
          complete: false,
        },
      ],
      buyers: [
        '5f8b114e3209475509ed6912',
        '5f8b114e3209475509ed6913',
        '5f8b114e3209475509ed6914',
        '5f8b114e3209475509ed6915',
      ],
      orders: [],
      deliveryInfo: {
        deliveryAddress: '3 Freemont street, London.',
        customer: '5f8b114e3209475509ed6913',
      },
    },
    saved: true,
    location: 'Leceister, United Kingdom',
    temperature: 34,
    description: 'A box of exotic wines.',
    rating: 3.2,
    reviews: 3212,
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

export {productMocks, users, user};
