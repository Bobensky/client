import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.js'
import Shop from '../pages/Shop.js'
import Pen from '../pages/Pen.js'
import Login from '../pages/Login.js'
import Signup from '../pages/Signup.js'
import Basket from '../pages/Basket.js'
import Checkout from '../pages/Checkout.js'
import Product from '../pages/Product.js'
import ProductMobile from '../pages/ProductMobile.js'
import About from '../pages/About.js'
import Delivery from '../pages/Delivery.js'
import Service from '../pages/Service.js'
import Contacts from '../pages/Contacts.js'
import NotFound from '../pages/NotFound.js'
import User from '../pages/User.js'
import UserOrders from '../pages/UserOrders.js'
import UserOrder from '../pages/UserOrder.js'
import Admin from '../pages/Admin.js'
import AdminOrders from '../pages/AdminOrders.js'
import AdminOrder from '../pages/AdminOrder.js'
import AdminCategories from '../pages/AdminCategories.js'
import AdminBrands from '../pages/AdminBrands.js'
import AdminMehanizms from '../pages/AdminMehanizms.js'
import AdminGenders from '../pages/AdminGenders.js'
import AdminShapes from '../pages/AdminShapes.js'
import AdminMaterials from '../pages/AdminMaterials.js'
import AdminGlasses from '../pages/AdminGlasses.js'
import AdminStraps from '../pages/AdminStraps.js'
import AdminPowers from '../pages/AdminPowers.js'
import AdminWaters from '../pages/AdminWaters.js'
import AdminProducts from '../pages/AdminProducts.js'
import AK from '../pages/ak.js'
import CK from '../pages/ck.js'
import Orient from '../pages/orient.js'
import Citizen from '../pages/citizen.js'
import Swatch from '../pages/swatch.js'
import Diesel from '../pages/diesel.js'
import Parker from '../pages/parker.js'
import Waterman from '../pages/waterman.js'
import Victorinox from '../pages/victorinox.js'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

const publicRoutes = [
    {path: '/', Component: Home},
    {path: '/Shop', Component: Shop},
    {path: '/shop?brand=10', Component: Pen},
    {path: '/login', Component: Login},
    {path: '/signup', Component: Signup},
    {path: '/product/:id', Component: Product},
    {path: '/productmobile/:id', Component: ProductMobile},
    {path: '/basket', Component: Basket},
    {path: '/checkout', Component: Checkout},
    {path: '/about', Component: About},
    {path: '/delivery', Component: Delivery},
    {path: '/service', Component: Service},
    {path: '/contacts', Component: Contacts},
    {path: '/anne_klein', Component: AK},
    {path: '/calvin_klein', Component: CK},
    {path: '/orient', Component: Orient},
    {path: '/citizen', Component: Citizen},
    {path: '/swatch', Component: Swatch},
    {path: '/diesel', Component: Diesel},
    {path: '/parker', Component: Parker},
    {path: '/waterman', Component: Waterman},
    {path: '/victorinox', Component: Victorinox},
    {path: '*', Component: NotFound},
]

const authRoutes = [
    {path: '/user', Component: User},
    {path: '/user/orders', Component: UserOrders},
    {path: '/user/order/:id', Component: UserOrder},
]

const adminRoutes = [
    {path: '/admin', Component: Admin},
    {path: '/admin/orders', Component: AdminOrders},
    {path: '/admin/order/:id', Component: AdminOrder},
    {path: '/admin/categories', Component: AdminCategories},
    {path: '/admin/brands', Component: AdminBrands},
    {path: '/admin/mehanizms', Component: AdminMehanizms},
    {path: '/admin/genders', Component: AdminGenders},
    {path: '/admin/shapes', Component: AdminShapes},
    {path: '/admin/materials', Component: AdminMaterials},
    {path: '/admin/glasses', Component: AdminGlasses},
    {path: '/admin/straps', Component: AdminStraps},
    {path: '/admin/powers', Component: AdminPowers},
    {path: '/admin/waters', Component: AdminWaters},
    {path: '/admin/catalogs', Component: AdminProducts},
]

const AppRouter = observer(() => {
    const { user } = useContext(AppContext)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    )
})

export default AppRouter