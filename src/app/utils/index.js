import axios from 'axios';
import moment from 'moment';

export const STRIPE_PUBLIC_KEY_TEST = 'pk_test_51IpG96JcDAQtRcgIXbz0QpUgrBYVWZCzXy3NgQQKqKwW3KcOxu8AGnTR7VyetN76yZsrxKiz6RXjVBityxnOqaAL00IDnEjonM';
export const STRIPE_PUBLIC_KEY_LIVE = 'pk_live_51IpG96JcDAQtRcgIUhG0ISK0v5FqqrNP1qzGxVB5a8ZAGzCKj5cARQnkYk3JTaTe5vGgKrmoat97IjrXmdhvNoyj002aLjueq2';

export function getFilenameAndExtension(pathfilename){
    const filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
    const filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
    const ext = filenameextension.split('.').pop();
  
    return [filename, ext];
}

export function emailExistence(email) {
    return new Promise((resolve, reject) => {
        axios
            .get('https://arcane-plateau-67676.herokuapp.com/email/existence', { params: { email } })
            .then(response => { 
                const isExistence = response.data;																												
                resolve(isExistence);
            }).catch((err) => {					
                resolve(false);
            })
    });	
}

export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

export function unformatPhoneNumber(phoneNumberString) {
    return phoneNumberString.replace(/[^\d]/g, "");
}

export function downloadURL(url, name) { 
    const link = document.createElement("a");
    link.id = name;
    link.download = name;
    link.href = url; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const download = async (url, name) => {
	const a = document.createElement('a');
	a.download = name;
	a.href = url;
	a.style.display = 'none';
	document.body.append(a);
	a.click();

	// Chrome requires the timeout
	await delay(100);
	a.remove();
};

export async function file_downloads(urls, options = {}) {
	if (!urls) {
		throw new Error('`urls` required');
	}

	for (const [index, url] of urls.entries()) {
		const name = typeof options.rename === 'function' ? options.rename({url, index, urls}) : '';

		await delay(index * 1000);
		download(url, name);
	}
};

export function getMailBody(invoiceData) {
    return(
        `
        <h2>Summary</h2>
        <table style='border-spacing: 4px'>
            <tr>
            <td><b>Billed to</b></td>
            <td>${invoiceData.customer_email}</td>
            <td><b>Invoice number</b></td>
            <td>${invoiceData.number}</td>
            </tr>
            <tr>
            <td><b>Name</b></td>
            <td>${invoiceData.customer_name}</td>
            <td><b>Billing method</b></td>
            <td></td>
            </tr>
            <tr>
            <td><b>Currency</b></td>
            <td>USD - US Dollar</td>
            </tr>
            <br>

            
            <tr>
            <td><h3>DESCRIPTION</h3></td>
            <td><h3>QTY</h3></td>
            <td><h3>UNIT PRICE</h3></td>
            <td><h3>AMOUNT</h3></td>
            </tr>
            <tr>
            <td>${moment.unix(invoiceData.period_start).format('MMM DD, YYYY')} -  ${moment.unix(invoiceData.period_end).format('MMM DD,YYYY')}</td>                    
            </tr>
            <tr>
            <td>${invoiceData.account_name}</td>
            <td>${invoiceData.lines.data[0].quantity}</td>
            <td>$${invoiceData.lines.data[0].price.unit_amount/100}</td>
            <td>$${invoiceData.lines.data[0].amount/100}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td><b>Subtotal</b></td>
            <td>$${invoiceData.subtotal/100}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td><b>Total</b></td>
            <td>$${invoiceData.total/100}</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td><b>Applied balance</b></td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td><b>Amount due</b></td>
            <td>$${invoiceData.amount_due/100}</td>
            </tr>
        </table>`
    )
}
