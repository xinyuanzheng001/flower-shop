import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LogInScreen from './screens/LogInScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PickUpScreen from './screens/PickUpScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderEditScreen from './screens/OrderEditScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import HomeVipScreen from './screens/HomeVipScreen'
import EditScreen from './screens/EditScreen'
import CategoryProductScreen from './screens/CategoryProductScreen'
import CartItemScreen from './screens/CartItemScreen'
import CheckOutScreen from './screens/CheckOutScreen'

function App() {
  return (
    <Router>
      <Header />
      <NavigationBar />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/search/:keyword' element={<HomeScreen />} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
              exact
            />
            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/vip' element={<HomeVipScreen />} exact />
            <Route path='/vip/:pageNumber' element={<HomeVipScreen />} exact />
            <Route path='/vip/product/:id' element={<ProductScreen />} exact />
            <Route
              path='/:category'
              element={<CategoryProductScreen />}
              exact
            />
            <Route
              path='/:category/:pageNumber'
              element={<CategoryProductScreen />}
              exact
            />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />

            <Route path='/cart/cartItem/:id' element={<CartItemScreen />} />
            <Route path='/checkout' element={<CheckOutScreen />} />

            <Route path='/login' element={<LogInScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route
              path='/profile/:pageNumber'
              element={<ProfileScreen />}
              exact
            />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/pickup' element={<PickUpScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/edit' element={<EditScreen />} exact />
            <Route path='/admin/orders' element={<OrderListScreen />} exact />
            <Route
              path='/admin/orders/:pageNumber'
              element={<OrderListScreen />}
              exact
            />
            <Route
              path='/admin/orders/:id/edit'
              element={<OrderEditScreen />}
            />
            <Route path='/admin/users' element={<UserListScreen />} exact />
            <Route
              path='/admin/users/:pageNumber'
              element={<UserListScreen />}
              exact
            />
            <Route
              path='/admin/users/:id/edit'
              element={<UserEditScreen />}
              exact
            />
            <Route
              path='/admin/users/:id/edit/:pageNumber'
              element={<UserEditScreen />}
              exact
            />
            <Route
              path='/admin/products'
              element={<ProductListScreen />}
              exact
            />
            <Route
              path='/admin/products/:pageNumber'
              element={<ProductListScreen />}
              exact
            />

            <Route
              path='/admin/products/:id/edit'
              element={<ProductEditScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
