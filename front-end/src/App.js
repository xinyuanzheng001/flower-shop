import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LogInScreen from './screens/LogInScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderEditScreen from './screens/OrderEditScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (
    <Router>
      <Header />
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
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart'>
              <Route path='' element={<CartScreen />} />
              <Route path=':id' element={<CartScreen />} />
            </Route>
            <Route path='/login' element={<LogInScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
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
            <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
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
