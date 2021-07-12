import React, { useState, useRef, useEffect } from "react";
import { useForm } from '@fuse/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import "react-credit-cards/es/styles-compiled.css";
import history from '@history';
import _ from '@lodash';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from "./utils";
import { getCreditCard, saveCreditCard, selectCreditCard } from '../store/creditCardSlice'
import withReducer from 'app/store/withReducer'; 
import reducer from '../store';
import { showMessage } from "app/store/fuse/messageSlice";
import axios from 'axios';
import { API_URL, FIREBASE_FUNCTION_API_ENDPOINT } from 'app/fuse-configs/endpointConfig';
import { deleteSubscription, getSubscription, saveSubscription, selectSubscriptions, createSubscription1, updateSubscription1 } from "../store/subscriptionsSlice";
import { getMailBody } from 'app/utils';

const defaultFormState = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
  saveFlag: 'insert',
};

function CreditCard(props) {
  const dispatch = useDispatch();  
  const stripe = useSelector(({ profileApp }) => profileApp.stripeProducts.stripe);
  const subscription = useSelector(selectSubscriptions); 
  const cardInfo = useSelector(selectCreditCard);
  const user = useSelector(({ auth }) => auth.user);
  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [focused, setFocused] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);
  
  const [ state, setState ] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    saveFlag: 'insert'
  });

  useEffect(() => {
    dispatch(getSubscription({ uid: user.uid }));
		dispatch(getCreditCard({ uid: user.uid })).then(setLoading(false));
	}, [dispatch]);

  useEffect(() => { 
    if(cardInfo.length > 0 && cardInfo[0].number) {  
      setForm({ ...form, ...cardInfo[0] });

      const numberList = cardInfo[0].number.split(' ');
      const lastNumber = numberList[numberList.length - 1];
      
      setState({ 
        name: 'XXX', 
        number: `XXXX XXXX XXXX ${lastNumber}`, 
        expiry: 'XX/XX', 
        cvc: 'XXX',
        saveFlag: 'update', 
      });
    } else {
      setForm(defaultFormState);
      setState(defaultFormState);
    }       
  }, [cardInfo]);

  const sendInvoiceMail = (invoiceId) => {
    axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/retrieveInvoice`, { id: invoiceId }).then((invoiceRes) => {
      const invoiceData = invoiceRes.data;

      dispatch(saveCreditCard({ ...form, uid: user.uid }))
      .then(() => { 
        
        /*
          send a invoce mail to client's email
        **/
        // axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/sendMailOverHTTP`, {
        //   email: user.data.email,
        //   subject: "INVOICE",
        //   emailBody: getMailBody(invoiceData)
        // });

        history.push({ pathname: '/pages/profile/business' });
      }).catch(() => {
        dispatch(showMessage({ message: 'Mailing process failed', variant: 'warning' })); 
        setLoading(false);
      });  
    });  
  }

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    if(target.name==='name') {
      setForm({ ...form, [target.name]: target.value });
    } else if(!target.value.includes('X')) {
      setForm({ ...form, [target.name]: target.value });
    }

    setState({ ...state, [target.name]: target.value });    
  };  

  /*
    function => create a new subscription
  **/
  const createCustomerAndSubscription = () => {

    /*
      create a new card token
    **/
    if(form.name) {
      axios.post(        
        `${FIREBASE_FUNCTION_API_ENDPOINT}/createCardToken`, 
        {
          name: form.name,
          number: form.number,
          exp_year: form.expiry.split('/')[1],
          exp_month: form.expiry.split('/')[0],
          cvc: form.cvc,
        }
      ).then(response => {
        const token = response.data.id;

        /*
          create a customer and a subscription on stripe with a token created by credit card number and planId
        **/
        createSubscription(token)
      }).catch(() => { 
        dispatch(showMessage({ 
          message: 'Your Credit Card could not be verified. Please re-enter your credit card or try with another card', 
          variant: 'warning' 
        }));
        setLoading(false);
      });
    } else { 
      createSubscription();
    }     
  };

  /*
    function => create a new subscription
  **/
  const createSubscription = (token = null) => {
    
    /*
      create a customer and a subscription on stripe with a token created by credit card number and planId
    **/
    dispatch(createSubscription1({user, stripe, token})).then((res) => {
      const response = res.payload;

      /*
        update a subscription data with firebase
      **/
      dispatch(saveSubscription({ uid: user.uid, data: response.data }));          

      /*
        send a invoice mail to user's email address
      **/
      const invoiceId = response.data.response.latest_invoice;
      sendInvoiceMail(invoiceId);                  
    }).catch((error) => {
      dispatch(showMessage({ message: error.message, variant: 'warning' }));
      setLoading(false);
    });    
  };

  /*
    function => update subscription
  **/
  const updateSubscription = () => {
    
    /*
      update a subscription
    **/
    dispatch(updateSubscription1({ subscription, stripe })).then(res => {
      const response = res.payload;

      const updateSubscription = { 
        ...subscription[0], response: {
          ...subscription[0].response, items: {
            ...subscription[0].response.items, data: [
              response.data
            ]
          }
        }  
      }

      /*
        update a subscription data with firebase
      **/
      dispatch(saveSubscription({ uid: user.uid, data: updateSubscription })).then(() => {
        axios.post(`${API_URL}/afterpayment`, {
          promo_code: user.data.promoCode,
          user_email: user.data.email
        });
      }); 

      /*
        send a invoice mail to user's email address
      **/
      const invoiceId = updateSubscription.response.latest_invoice;
      sendInvoiceMail(invoiceId);         
    }).catch(() => {
      dispatch(showMessage({ 
        message: 'Your Billing request could not update. Please re-enter your credit card or try with another card', 
        variant: 'warning' 
      }));
      setLoading(false);
    });
  };

  const formSubmit = () => {

    /*
      update it if subscription was already created and create a new subscription if not
    **/
    if(subscription.length > 0) { 

      /*
        update a customer's card if an enterd card number is not equal to the original one
      **/
      if(cardInfo.length===0 || (cardInfo.length>0 && cardInfo[0].number !== form.number)) { 
        axios.post(        
          `${FIREBASE_FUNCTION_API_ENDPOINT}/createCardToken`, 
          {
            name: form.name,
            number: form.number,
            exp_year: form.expiry.split('/')[1],
            exp_month: form.expiry.split('/')[0],
            cvc: form.cvc,
          }         
        ).then(response => {
          const token = response.data.id;
          
          axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/updateCustomer`, { id: subscription[0].customer.id, source: token });
        }).catch(() => {
          dispatch(showMessage({ 
            message: 'Your Billing request could not create. Please re-enter your credit card or try with another card', 
            variant: 'warning' 
          }));
          setLoading(false);
        });    
      }

      /*
        check if promo-code is updated
      **/
      if(user.data.promoCode !== subscription[0].response.plan.nickname) { 
        axios.post(`${FIREBASE_FUNCTION_API_ENDPOINT}/cancelSubscription`, { id: subscription[0].id }).then(() => {
          dispatch(deleteSubscription({ uid: user.uid, subId: subscription[0].id })).then(() => {
            createCustomerAndSubscription();
          });          
        });
      } else {                
        updateSubscription();  
      }                
    } else { 
      createCustomerAndSubscription();
    }	 
  }
  
  const handleSubmit = e => { 
    setLoading(true);
    e.preventDefault();       

    formSubmit();         	
  };

  if(loading) {
    return <FuseLoading />
  }

  return (
    <div className='w-full'>         
      {/* <Card
        number={state.number}
        name={state.name}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focused}
        callback={handleCallback}
      /> */}
      <form className="flex flex-col justify-center w-full" ref={formRef} autoComplete="off" onSubmit={handleSubmit}>    
        <TextField
          type="text"
          name="name"
          className="my-16"
          value={state.name}
          label="Name of Credit Card Holder"                
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        
        <TextField
          type="tel"
          name="number"
          className="mb-16"
          label="Credit Card"
          value={state.number}
          pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        
        <TextField
          type="tel"
          name="expiry"
          className="mb-16"
          label="Expiration Date(MM/YY)"
          value={state.expiry}
          pattern="\d\d/\d\d"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        <TextField
          type="tel"
          name="cvc"
          className="mb-16"
          label="CVV"
          value={state.cvc}
          pattern="\d{3,4}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
                
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="REGISTER WITH FIREBASE"
          // disabled={!isFormValid}
        >
          Upgrade
        </Button>
      </form>     
    </div>
  );
}

export default withReducer('profileApp', reducer)(CreditCard);