import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	body: {
		paddingBottom: '5px'
	},
	title: {
		paddingBottom: '5px',
		paddingTop: '10px'
	},
}));

function TermsAndConditionsContent(props) {
	const classes = useStyles(props);

	return (
		<div>			
			<Typography className={classes.title} variant="h6">TERMS & CONDITIONS OF SimplyAI LLC</Typography>

			<Typography className={classes.body} variant="body2">These are our terms of service. Please take a moment to review all of these terms so you know what you're agreeing to. By clicking on accept and submit, you are agreeing to the following terms and conditions (the “Agreement”).</Typography>

			<Typography className={classes.body} variant="body2">In this Terms and Conditions, “we”, “us”, “our” or “Jobsage” refers to Jobsage LLC. located at 6064 Cloverdale, Dr Tega Cay, South Carolina, 29708. "You", "your" or “Customer” means the person or entity using the Subscription Service or receiving the Consulting Services and identified in the applicable account record, billing statement, online subscription process, or Order Form as the customer.</Typography>

			<Typography className={classes.body} variant="body2">The Agreement relates to the website, including, but not limited to, the Jobsage product and Jobsage hosted/cloud service (taken together, the Website). The Website is owned and operated by Jobsage. The Website is subject to all of the terms and conditions contained in this Agreement and all other operating rules, policies (including, without limitation, Jobsage privacy policy) and procedures that may be published from time to time on this Site Jobsage.app.  We update these terms from time to time. If you have an active jobsage product or service usage, we will let you know when we update the terms via in-app notification or by email. You can find archived versions of the Master Terms, Product Specific Terms, Jurisdiction Specific Terms & DPA.</Typography>
			
			<br />

			<Typography className={classes.body} variant="body2">The Website is available only to individuals who are at least 18 years old.</Typography>

			<Typography className={classes.body} variant="body2">Violation of any of the terms below will result in the termination of your Account. You agree to use the Service at your own risk.</Typography>

			<Typography className={classes.body} variant="body2">This Agreement is a contract that governs your use of the Jobsage services. It consists of the following:</Typography>

			<Typography className={classes.body} variant="body2">• 	Master Terms: These contain the core legal and commercial terms that apply to your subscription to our product & services</Typography>

			<Typography className={classes.body} variant="body2">• 	Order form & Product Catalogue: These include any additional terms that apply to your use of each of our product & services offerings, our consulting and 		otherservices and third party services. </Typography>

			<Typography className={classes.body} variant="body2">• 	Data Processing Agreement (DPA): This explains how we process your data and includes the EU Standard Contractual Clauses.
				Your Order Form is the Jobsage-approved form created following your purchase of one of our products or services through our online payment process or via in-app purchase. It contains all of the details about your purchase, including your term, products & services purchased and your fees. You’ll find your Order 		Form(s) in the Documents section of your Jobsage portal. We’ve aimed to keep these documents as readable as possible, but in some cases for legal reasons, some 	of the language is necessarily “legalese”. </Typography>

			<Typography className={classes.title} variant="h6">MASTER TERMS</Typography>

			<Typography className={classes.title} variant="h6">1.	DEFINITIONS </Typography>
			<Typography className={classes.title} variant="h6">2.	USE OF SERVICES </Typography>
			<Typography className={classes.title} variant="h6">3.	FEES </Typography>
			<Typography className={classes.title} variant="h6">4.	TERM & TERMINATION </Typography>
			<Typography className={classes.title} variant="h6">5.	CUSTOMER DATA </Typography>
			<Typography className={classes.title} variant="h6">6.	INTELLECTUAL PROPERTY </Typography>
			<Typography className={classes.title} variant="h6">7.	CONFIDENTIALITY </Typography>
			<Typography className={classes.title} variant="h6">8.	PUBLICITY </Typography>
			<Typography className={classes.title} variant="h6">9.	INDEMNIFICATION </Typography>
			<Typography className={classes.title} variant="h6">10.	DISCLAIMERS; LIMITATION OF LIABILITY </Typography>
			<Typography className={classes.title} variant="h6">11.	MISCELLANEOUS</Typography>
			<Typography className={classes.title} variant="h6">12.	JURISDICTION</Typography>
			<br/>
			<Typography className={classes.title} variant="h6">1.	DEFINITIONS:</Typography>

			<Typography className={classes.body} variant="body2">“Add-Ons” means additional product enhancements (including limit increases, capacity packs, and other add-ons) that are made available for purchase and are listed in the ‘Add-Ons and Technical Limits’ section of our Products and Services Catalog.</Typography>

			<Typography className={classes.body} variant="body2">"Affiliate" means any entity which directly or indirectly controls, is controlled by, or is under common control with a party to this Agreement. For purposes of this definition, control means direct or indirect ownership or control of more than 50% of the voting interests of the subject entity. </Typography>

			<Typography className={classes.body} variant="body2">"Agreement" or “Customer Terms of Service” means these Master Terms and all materials referred or linked to in here. </Typography>

			<Typography className={classes.body} variant="body2">"Billing Period" means the period for which you agree to prepay fees under an Order Form. This may be the same length as than the service Term specified in your Order Form or it may be shorter. For example, if you subscribe to the Service for a one (1) year Subscription Term, with a twelve (12) month upfront payment, the Billing Period will be twelve (12) months. </Typography>

			<Typography className={classes.body} variant="body2">“Confidential Information” means all confidential information disclosed by a party ("Disclosing Party") to the other party ("Receiving Party"), whether orally or in writing, that is designated as confidential. Confidential Information shall include all information concerning: (a) Disclosing Party's customers and potential customers, past, present or proposed products, marketing plans, engineering and other designs, technical data, business plans, business opportunities, finances, research, development, and the terms and conditions of this Agreement. Confidential Information does not include any information that (i) is or becomes generally known to the public without breach of any obligation owed to the Disclosing Party, (ii) was known to the Receiving Party prior to its disclosure by the Disclosing Party without breach of any obligation owed to the Disclosing Party, (iii) is received from a third party without breach of any obligation owed to the Disclosing Party, or (iv) was independently developed by the Receiving Party. Subject to the foregoing exclusions, Customer Data will be considered Confidential Information under this Agreement regardless of whether or not it is designated as confidential. </Typography>

			<Typography className={classes.body} variant="body2">"Contact" means a single individual (other than a User) whose Contact Information is stored by you in the Service order form.</Typography>

			<Typography className={classes.body} variant="body2">"Contact Information" means the name, email address, phone number, online user name(s), telephone number, and similar information submitted by visitors to your landing pages on the Subscription Service or uploaded by you to the Subscription Service. </Typography>

			<Typography className={classes.body} variant="body2">"Consulting Services" means the professional services we provided to you, which may include training services, installation, integration or other consulting services. </Typography>

			<Typography className={classes.body} variant="body2">"Customer Data" means all information that you submit or collect via the Jobsage Service. Customer Data does not include Jobsage Content. </Typography>

			<Typography className={classes.body} variant="body2">"Customer Materials" means all materials that you provide or post, upload, input or submit for public display through the Service.</Typography>

			<Typography className={classes.body} variant="body2">“DPA” means the Jobsage Data Processing Agreement.</Typography>

			<Typography className={classes.body} variant="body2">“Free Services” means the Service or other products or features we make available to you on an unpaid trial or free basis.</Typography>

			<Typography className={classes.body} variant="body2">"Jobsage Content" means all information, data, text, messages, software, sound, music, video, photographs, graphics, images, and tags that we incorporate into the Subscription Service or Consulting Services, including Enrichment Data (as defined in the Product Specific Terms).</Typography>

			<Typography className={classes.body} variant="body2">"Order" or "Order Form" means the Jobsage-approved form or online subscription process by which you agree to subscribe to the Service and purchase Jobsage Consulting Services.</Typography>

			<Typography className={classes.body} variant="body2">Personal Data” means any information relating to an identified or identifiable individual where such information is contained within Customer Data and is protected similarly as personal data or personally identifiable information under applicable Data Protection Law (as defined in the DPA).</Typography>

			<Typography className={classes.body} variant="body2">“Product and Services Catalog” means Jobsage’s Product and Services Catalog available at the website.</Typography>

			<Typography className={classes.body} variant="body2">“Product Specific Terms’ means the additional product-related terms that apply to your use of Jobsage products, our consulting services and Third party Services. These terms form part of the Agreement and can be found at the website.</Typography>

			<Typography className={classes.body} variant="body2">"Subscription Fees" means the amount you pay for the Jobsage Service excluding of all applicable taxes.</Typography>

			<Typography className={classes.body} variant="body2">"Subscription Service" means all of our web-based applications, tools and platforms that you have subscribed to under an Order Form or that we otherwise make available to you, and are developed, operated, and maintained by us, accessible via Jobsage.app or another designated URL, and any ancillary products and services, including website hosting, that we provide to you.</Typography>

			<Typography className={classes.body} variant="body2">"Subscription Term" means the initial term of your subscription to the applicable Subscription Service, as specified on your Order Form(s), and each subsequent renewal term (if any). For Free Services or trail period, the Subscription Term will be the period during which you have an account to access the Free Services or trial period.</Typography>

			<Typography className={classes.body} variant="body2">"Third-Party Products" means non-embedded products and professional services that are provided by third parties which interoperate with or are used in connection with the Subscription Service. These products and services include Non-Jobsage apps available.</Typography>

			<Typography className={classes.body} variant="body2">"Third-Party Sites" means third-party websites linked to from within the Subscription Service, including Communications Services.</Typography>

			<Typography className={classes.body} variant="body2">"Users" means Customer’s employees, representatives, consultants, contractors or agents who are authorized to use the Subscription Service for Customer’s benefit and have unique user identifications and passwords for the Subscription Service.</Typography>

			<Typography className={classes.title} variant="h6">2.	USE OF SERVICES</Typography>

			<Typography className={classes.body} variant="body2">Access.  During the Subscription Term, we will provide your Users access to use the Subscription Service as described in this Agreement and the applicable Order. We may also provide your Users access to use our Free Services for trial period at any time by activating them. We might provide some or all elements of the Subscription Service through third party service providers. You may provide access and use of the Subscription Service to your Affiliate’s Users or allow them to receive the Consulting Services purchased under this Order; provided that, all such access, use and receipt by your Affiliate’s Users is subject to and in compliance with the Agreement and you will at all times remain liable for your Affiliates' compliance with the Agreement.</Typography>
			
			<Typography className={classes.body} variant="body2">Additional Features. You may subscribe to additional features of the Subscription Service by placing an additional Order or activating the additional features from within your Jobsage account (if we make this option available.). This Agreement will apply to all additional Order(s) and all additional features that you activate from within your Jobsage account. </Typography>

			<Typography className={classes.body} variant="body2">Limits. The limits that apply to you will be specified in your Order Form, this Agreement, or in our Product and Services Catalog, and for our Free Subscriptions, these limits may also be designated only from within the product itself. For further information on the limits that apply to your subscription, please refer to the Product Specific Terms in the product catalogue. </Typography>

			<Typography className={classes.body} variant="body2">Modifications. We modify the Subscription Service from time to time, including by adding or deleting features and functions, in an effort to improve your experience. For further information on our modification rights that apply to your subscription, please refer to the Product Specific Terms in the product catalogue </Typography>

			<Typography className={classes.body} variant="body2">Customer Support. For information on the customer support terms that apply to your subscription, please refer the contact information on the website.</Typography>

			<Typography className={classes.body} variant="body2">Prohibited and Unauthorized Use. You will not use the Subscription Service in any way that violates the terms of this Agreement or for any purpose or in any manner that is unlawful or prohibited by this Agreement. You may not use the Subscription Service if you are legally prohibited from receiving or using the Subscription Service under the laws of the country in which you are resident or from which you access or use the Subscription Service. The Subscription Service is not designed to comply with industry-specific regulations such as the Health Insurance or the Federal Information etc., so you may not use the Subscription Service where your communications would be subject to such laws. Nothing contained in this section will limit the usage restrictions specific to Sensitive Information under the Agreement.</Typography>

			<Typography className={classes.body} variant="body2">No Sensitive Information. YOU ACKNOWLEDGE THAT THE SUBSCRIPTION SERVICES HAVE NOT BEEN DESIGNED TO PROCESS OR MANAGE SENSITIVE INFORMATION INCLUDING “PERSONALLY IDENTIFIABLE INFORMATION” AS THAT TERM IS COMMONLY DEFINED IN PRIVACY LAWS AND ACCORDINGLY YOU AGREE NOT TO USE THE SUBSCRIPTION SERVICE TO COLLECT, MANAGE OR PROCESS SENSITIVE INFORMATION. WE WILL NOT HAVE AND WE SPECIFICALLY DISCLAIM ANY LIABILITY THAT MAY RESULT FROM YOUR USE OF THE SUBSCRIPTION SERVICE TO COLLECT, PROCESS OR MANAGE SENSITIVE INFORMATION.</Typography>

			<Typography className={classes.title} variant="h6">3.	FEES</Typography>

			<Typography className={classes.body} variant="body2">Subscription Fees. The Subscription Fee will remain fixed during the initial term of your subscription unless: (i) you exceed your Maximum resumes, Email Send Limit, User or other applicable limits (see the ‘Limits’ section above), (ii) you upgrade products or base packages, (iii) you subscribe to additional features or products, or (iv) otherwise agreed to in your Order. We may also choose to decrease your fees upon written notice to you. You can find all the information about how your fees may be otherwise adjusted in Product Specific Terms.</Typography>

			<Typography className={classes.body} variant="body2">Fee Adjustments at Renewal. Upon renewal, we may increase your fees up to our then current list price set out in our Product and Services Catalog. If this increase applies to you, we will notify you at least thirty (30) days in advance of your renewal and the increased fees will apply at the start of the next renewal term. If you do not agree to this increase, either party can choose to terminate your subscription at the end of your then-current term by giving the 30 days prior notice required.</Typography>

			<Typography className={classes.body} variant="body2">Payment by credit card. If you are paying by credit card, you authorize us to charge your credit card or bank account for all fees payable during the Subscription Term. You further authorize us to use a third party to process payments, and consent to the disclosure of your payment information to such third party.</Typography>

			<Typography className={classes.body} variant="body2">Payment against invoice. If you are paying by invoice, we will invoice you no more than thirty (30) days before the beginning of the Subscription Term and each subsequent Billing Period, and other times during the Subscription Term when fees are payable. All amounts invoiced are due and payable within thirty (30) days from the date of the invoice, unless otherwise specified in the Order Form.</Typography>

			<Typography className={classes.body} variant="body2">Payment Information. You will keep your contact information, billing information and credit card information (where applicable) up to date. Changes may be made on your Billing Page. All payment obligations are non-cancellable, and all amounts paid are non-refundable, except as specifically provided for in this Agreement. All fees are due and payable in advance throughout the Subscription Term.</Typography>
			
			<Typography className={classes.body} variant="body2">Taxes. All fees are exclusive of taxes, which we will charge as applicable. You agree to pay any taxes applicable to your use of the Subscription Service and performance of Consulting Services. You will have no liability for any taxes based upon our gross revenues or net income. If you are located in the European Union, all fees are exclusive of any VAT and you represent that you are registered for VAT purposes in your member state. At our request, you will provide us with the VAT registration number under which you are registered in your member state. If you do not provide us with a VAT registration number prior to your transaction being processed, we will not issue refunds or credits for any VAT that was charged. If you are subject to GST, all fees are exclusive of GST.</Typography>

			<Typography className={classes.body} variant="body2">Withholding Tax. If you are required to deduct or withhold tax from payment of your Jobsage invoice, you may deduct this amount from the applicable Subscription Fee due to the extent it is due and payable as assessed withholding tax required under laws that apply to you (the “Deduction Amount”).
			You will not be required to repay the Deduction Amount to us, provided that you present us with a valid tax receipt verifying payment of the Deduction Amount to the relevant tax authority within ninety (90) days from the date of the invoice. If you do not provide this tax receipt within the specified time period, then all fees, inclusive of the Deduction Amount, will be immediately due and payable, and failure to pay these fees may result in your account being suspended or terminated for non-payment.</Typography>

			<Typography className={classes.title} variant="h6">4.	TERM AND TERMINATION </Typography>

			<Typography className={classes.body} variant="body2">Term and Renewal. Your initial subscription period will be specified in your Order, and, unless otherwise specified in your Order, your subscription will automatically renew for the shorter of the subscription period, or one year. </Typography>

			<Typography className={classes.body} variant="body2">Notice of Non-Renewal. Unless otherwise specified in your Order, to prevent renewal of your subscription, you or we must give written notice of non-renewal. The deadline for sending this notice varies depending on the Jobsage product and edition you have subscribed to. For more information on non-renewal notice periods, please see the Product Specific Terms. If you decide not to renew, you may send this non-renewal notice to us by indicating that you do not want to renew.</Typography>

			<Typography className={classes.body} variant="body2">Early Cancellation. You may choose to cancel your subscription early at your convenience provided that, we will not provide any refunds of prepaid fees or unused Subscription Fees, and you will promptly pay all unpaid fees due through the end of the Subscription Term. </Typography>

			<Typography className={classes.body} variant="body2">Termination for Cause. Either party may terminate this Agreement for cause, as to any or all Subscription Services: (i) upon thirty (30) days’ notice to the other party of a material breach if such breach remains uncured at the expiration of such period, or (ii) immediately, if the other party becomes the subject of a petition in bankruptcy or any other proceeding relating to insolvency, cessation of business, liquidation or assignment for the benefit of creditors. We may also terminate this Agreement for cause on thirty (30) days’ notice if we determine that you are acting, or have acted, in a way that has or may negatively reflect on or affect us, our prospects, or our customers. This Agreement may not otherwise be terminated prior to the end of the Subscription Term</Typography>

			<Typography className={classes.title} variant="h6">Suspension </Typography>

			<Typography className={classes.body} variant="body2">Suspension for Prohibited Acts. We may suspend your access or any specific User’s access to any or all Subscription Services without notice for: (i) use of the Subscription Service in a way that violates applicable local, state, federal, or foreign laws or regulations or the terms of this Agreement, (ii) use of the Jobsage email send service that results in excessive hard bounces, SPAM complaints via feedback loops, direct spam complaints (to our abuse desk), or requests for removal from a mailing list by recipients, or (iii) repeated instances of posting or uploading material that infringes or is alleged to infringe on the copyright or trademark rights of any person or entity. We may, without notice, review and delete any Customer Data or Customer Materials that we determine in good faith violate these terms , provided that, we have no duty (unless applicable laws or regulations provide otherwise) to prescreen, control, monitor or edit your Customer Data or Customer Materials. </Typography>

			<Typography className={classes.body} variant="body2">Suspension for Non-Payment. We will provide you with notice of non-payment of any amount due. Unless the full amount has been paid, we may suspend your access to any or all of the Subscription Services ten (10) days after such notice. We will not suspend the Subscription Service while you are disputing the applicable charges reasonably and in good faith and are cooperating diligently to resolve the dispute. If a Subscription Service is suspended for non-payment, we may charge a re-activation fee to reinstate the Subscription Service.</Typography>

			<Typography className={classes.body} variant="body2">Suspension for Present Harm. If your website, or use of, the Subscription Service: (i) is being subjected to denial of service attacks or other disruptive activity, (ii) is being used to engage in denial of service attacks or other disruptive activity, (iii) is creating a security vulnerability for the Subscription Service or others, (iv) is consuming excessive bandwidth, or (v) is causing harm to us or others, then we may, with electronic or telephonic notice to you, suspend all or any access to the Subscription Service. </Typography>

			<Typography className={classes.body} variant="body2">Suspension and Termination of Free Services. We may suspend, limit, or terminate the Free Services for any reason at any time without notice. We may terminate your subscription to the Free Services due to your inactivity. </Typography>

			<Typography className={classes.body} variant="body2">Effect of Termination or Expiration. Upon termination or expiration of this Agreement, you will stop all use of the Subscription Service and Jobsage Content. If you terminate this Agreement for cause of material breach, we will promptly refund any prepaid but unused fees covering use of the Subscription Service after termination. If we terminate this Agreement for cause of material breach, you will promptly pay all unpaid fees due through the end of the Subscription Term. Fees which are otherwise non-refundable.</Typography>

			<Typography className={classes.title} variant="h6">5.	CUSTOMER DATA </Typography>

			<Typography className={classes.body} variant="body2">Customer’s Proprietary Rights. You own and retain all rights to the Customer Materials and Customer Data. This Agreement does not grant us any ownership rights to Customer Materials or Customer Data. You grant permission to us and our licensors to use the Customer Materials and Customer Data only as necessary to provide the Subscription Service and Consulting Services to you and as otherwise permitted by this Agreement. If you are using the Subscription Service or receiving Consulting Services on behalf of another party, then you represent and warrant that you have all sufficient and necessary rights and permissions to do so.</Typography>

			<Typography className={classes.body} variant="body2">We may monitor use of the Subscription Service by all of our customers and use the information gathered in an aggregate and anonymized manner. We may use Customer Data in an anonymized manner for machine learning. </Typography>

			<Typography className={classes.body} variant="body2">Protection of Customer Data. The terms of the DPA are hereby incorporated by reference and will apply to the extent any Customer Data includes Personal Data. The DPA sets out how we will process Personal Data on your behalf in connection with the Subscription Services provided to you under this Agreement. We will maintain commercially appropriate administrative, physical, and technical safeguards to protect Personal Data.</Typography>

			<Typography className={classes.title} variant="h6">6.	INTELLECTUAL PROPERTY</Typography>

			<Typography className={classes.body} variant="body2">This is an agreement for access to and use of the Subscription Service, and you are not granted a license to any software by this Agreement. The Subscription Service and Consulting Services are protected by intellectual property laws, they belong to and are the property of us or our licensors (if any), and we retain all ownership rights to them. You agree not to copy, rent, lease, sell, distribute, or create derivative works based on the HubSpot Content, the Subscription Service, or the Consulting Services in whole or in part, by any means, except as expressly authorized in writing by us. Our trademarks include, but aren’t limited to, those listed at jobsage website (which we may update at any time without notice to you) and you may not use any of these without our prior written permission.</Typography>

			<Typography className={classes.title} variant="h6">7.	PUBLICITY</Typography> 

			<Typography className={classes.body} variant="body2">You grant us the right to add your name and company logo to our customer list and website.</Typography>


			<Typography className={classes.title} variant="h6">8.	CONFIDENTIALITY</Typography>

			<Typography className={classes.body} variant="body2">The Receiving Party will: (i) protect the confidentiality of the Confidential Information of the Disclosing Party using the same degree of care that it uses to protect the confidentiality of its own confidential information of like kind, but in no event less than reasonable care, (ii) not use any Confidential Information of the Disclosing Party for any purpose outside the scope of this Agreement, (iii) not disclose Confidential Information of the Disclosing Party to any third party (except those third party service providers used by us to provide some or all elements of the Subscription Service or Consulting Services</Typography>
			
			<Typography className={classes.body} variant="body2">The Receiving Party may disclose Confidential Information of the Disclosing Party if required to do so under any federal, state, or local law, statute, rule or regulation, subpoena or legal process; provided, however, that (i) the Receiving Party will provide the Disclosing Party with prompt notice of any request that it disclose Confidential Information, sufficient to allow the Disclosing Party to object to the request and/or seek an appropriate protective order or, if such notice is prohibited by law, the Receiving Party will disclose the minimum amount of Confidential Information required to be disclosed under the applicable legal mandate; and (ii) in no event will the Receiving Party disclose Confidential Information to a party other than a government agency except under a valid order from a court having jurisdiction requiring the specific disclosure.</Typography>

			<Typography className={classes.title} variant="h6">9.	INDEMNIFICATION </Typography>

			<Typography className={classes.body} variant="body2">You will indemnify, defend and hold us and our Affiliates harmless, at your expense, against any third-party claim, suit, action, or proceeding (each, an "Action") brought against us (and our officers, directors, employees, agents, service providers, licensors, and affiliates) by a third party not affiliated with us or our Affiliates to the extent that such Action is based upon or arises out of (a) unauthorized or illegal use of the Subscription Service by you or your Affiliates, (b) your or your Affiliates' noncompliance with or breach of this Agreement, (c) your or your Affiliates' use of Third-Party Products, or (d) the unauthorized use of the Subscription Service by any other person using your User information. We will: notify you in writing within thirty (30) days of our becoming aware of any such claim; give you sole control of the defense or settlement of such a claim; and provide you (at your expense) with any and all information and assistance reasonably requested by you to handle the defense or settlement of the claim. You will not accept any settlement that (i) imposes an obligation on us; (ii) requires us to make an admission; or (iii) imposes liability not covered by these indemnifications or places restrictions on us without our prior written consent.</Typography>

			<Typography className={classes.title} variant="h6">10.	DISCLAIMERS; LIMITATION OF LIABILITY </Typography>

			<Typography className={classes.body} variant="body2">Disclaimer of Warranties. WITHOUT LIMITING OUR OBLIGATIONS IN THE 'PROTECTION OF CUSTOMER DATA' SECTION OF THIS AGREEMENT, WE AND OUR AFFILIATES AND AGENTS MAKE NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, SECURITY OR ACCURACY OF THE SUBSCRIPTION SERVICE, DATA MADE AVAILABLE FROM THE SUBSCRIPTION SERVICE, HUBSPOT CONTENT, OR THE CONSULTING SERVICES FOR ANY PURPOSE.. TO THE EXTENT PERMITTED BY LAW, THE SUBSCRIPTION SERVICE, JOBSAGE CONTENT AND CONSULTING SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. WE DISCLAIM ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, WITH REGARD TO THE SUBSCRIPTION SERVICE AND THE CONSULTING SERVICES, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. </Typography>

			<Typography className={classes.body} variant="body2">No Indirect Damages. TO THE EXTENT PERMITTED BY LAW, IN NO EVENT WILL EITHER PARTY OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR LOSS OF PROFITS, REVENUE, DATA OR BUSINESS OPPORTUNITIES ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY; PROVIDED THAT.</Typography>

			<Typography className={classes.body} variant="body2">Limitation of Liability. EXCEPT FOR YOUR LIABILITY FOR PAYMENT OF FEES, YOUR LIABILITY ARISING FROM YOUR OBLIGATIONS UNDER THE ‘INDEMNIFICATION’ SECTION, AND YOUR LIABILITY FOR VIOLATION OF OUR INTELLECTUAL PROPERTY RIGHTS, IF, NOTWITHSTANDING THE OTHER TERMS OF THIS AGREEMENT, EITHER PARTY OR ITS AFFILIATES IS DETERMINED TO HAVE ANY LIABILITY TO THE OTHER PARTY, ITS AFFILIATES OR ANY THIRD PARTY, THE PARTIES AGREE THAT THE AGGREGATE LIABILITY OF A PARTY AND ITS AFFILIATES WILL BE LIMITED TO A SUM EQUAL TO THE TOTAL AMOUNTS PAID OR PAYABLE FOR THE SUBSCRIPTION SERVICE IN THE TWELVE MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO A CLAIM; PROVIDED HOWEVER, THIS LIMITATION WILL NOT APPLY TO YOU IF YOU ONLY USE THE FREE SERVICES, AND IN THIS CASE, IF WE ARE DETERMINED TO HAVE ANY LIABILITY TO YOU OR ANY THIRD PARTY ARISING FROM YOUR USE OF THE FREE SERVICES, THEN OUR AGGREGATE LIABILITY WILL BE LIMITED TO ONE HUNDRED U.S. DOLLARS. </Typography>

			<Typography className={classes.body} variant="body2">Third Party Products. WE AND OUR AFFILIATES DISCLAIM ALL LIABILITY WITH RESPECT TO THIRD-PARTY PRODUCTS THAT YOU USE. OUR LICENSORS WILL HAVE NO LIABILITY OF ANY KIND UNDER THIS AGREEMENT. </Typography>

			<Typography className={classes.body} variant="body2">Agreement to Liability Limit. YOU UNDERSTAND AND AGREE THAT ABSENT YOUR AGREEMENT TO THIS LIMITATION OF LIABILITY, WE WOULD NOT PROVIDE THE SUBSCRIPTION SERVICE TO YOU.</Typography>

			<Typography className={classes.title} variant="h6">11.	MISCELLANEOUS</Typography>

			<Typography className={classes.body} variant="body2">Force Majeure. Neither party will be responsible for failure or delay of performance if caused by: an act of war, hostility, or sabotage; act of God; electrical, internet, or telecommunication outage that is not caused by the obligated party; government restrictions; or other event outside the reasonable control of the obligated party. Each party will use reasonable efforts to mitigate the effect of a force majeure event.</Typography>

			<Typography className={classes.body} variant="body2">Actions Permitted. Except for actions for non-payment or breach of a party’s proprietary rights, no action, regardless of form, arising out of or relating to this Agreement may be brought by either party more than one (1) year after the cause of action has accrued.</Typography>

			<Typography className={classes.body} variant="body2">Relationship of the Parties. You and we agree that no joint venture, partnership, employment, or agency relationship exists between us.</Typography>

			<Typography className={classes.body} variant="body2">Compliance with Laws. We will comply with all United States Federal & State laws (where applicable) in our provision of the Subscription Service, the Consulting Services and our processing of Customer Data. We reserve the right at all times to disclose any information as necessary to satisfy any law, regulation, legal process or governmental request, You will not directly or indirectly export, re-export, or transfer the Subscription Service or Consulting Services to prohibited countries or individuals or permit use of the Subscription Service or Consulting Services by prohibited countries or individuals.</Typography>

			<Typography className={classes.body} variant="body2">Severability. If any part of this Agreement or an Order Form is determined to be invalid or unenforceable by applicable law, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of this Agreement will continue in effect.</Typography>

			<Typography className={classes.body} variant="body2">Notice will be sent to the contact address set forth in the Jurisdiction Specific Terms and will be deemed delivered as of the date of actual receipt.</Typography>

			<Typography className={classes.body} variant="body2">This Agreement (including each Order), along with our Privacy Policy is the entire agreement between us for the Subscription Service and Consulting Services and supersedes all other proposals and agreements, whether electronic, oral or written, between us. We object to and reject any additional or different terms proposed by you, including those contained in your purchase order, acceptance or website. Our obligations are not contingent on the delivery of any future functionality or features of the Subscription Service or dependent on any oral or written public comments made by us regarding future functionality or features of the Subscription Service. We might make versions of this Agreement available in languages other than English. If we do, the English version of this Agreement will govern our relationship and the translated version is provided for convenience only and will not be interpreted to modify the English version of this Agreement.</Typography>

			<Typography className={classes.body} variant="body2">No Third Party Beneficiaries. Nothing in this Agreement, express or implied, is intended to or will confer upon any third party person or entity any right, benefit or remedy of any nature whatsoever under or by reason of this Agreement.</Typography>

			<Typography className={classes.body} variant="body2">Authority. Each party represents and warrants to the other that it has full power and authority to enter into this Agreement and that it is binding upon such party and enforceable in accordance with its terms. You further warrant and represent that you have has the authority to procure your Affiliates compliance with the terms of this Agreement.</Typography>

			<Typography className={classes.body} variant="body2">Precedence. In the event of a conflict between the terms of the Agreement and an Order, the terms of the Order will control, but only as to that Order.</Typography>


			<Typography className={classes.title} variant="h6">12.	JURISDICTION</Typography>
			<Typography className={classes.body} variant="body2">This Agreement constitutes the entire agreement between Jobsage and you concerning the subject matter hereof, and they may only be modified by a written amendment signed by an authorized executive of Jobsage, or by the posting by Jobsage of a revised version. The Agreement and these Conditions shall be governed by and construed in accordance with the applicable laws of United States & by the laws of the state of South Carolina. Unless any alternative dispute resolution procedure is agreed between the parties, the parties agree to submit to the exclusive jurisdiction of the Federal Courts in South Carolina & laws of United states in respect of any dispute which arises out of or under this Agreement. The prevailing party in any action or proceeding to enforce this Agreement shall be entitled to costs and attorneys' fees. If any part of this Agreement is held invalid or unenforceable, that part will be construed to reflect the parties' original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; Jobsage may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.</Typography>

			<Typography className={classes.body} variant="body2">JOBSAGE DATA PROCESSING AGREEMENT (DPA)</Typography>

			<Typography className={classes.body} variant="body2">CUSTOMER RESPONSIBILITIES </Typography>
			<Typography className={classes.body} variant="body2">Compliance with Laws. Within the scope of the Agreement and in its use of the services, you will be responsible for complying with all requirements that apply to it under applicable Data Protection Laws with respect to its Processing of Personal Data and the Instructions it issues to us. In particular but without prejudice to the generality of the foregoing, you acknowledge and agree that you will be solely responsible for: (i) the accuracy, quality, and legality of Customer Data and the means by which you acquired Personal Data; (ii) complying with all necessary transparency and lawfulness requirements under applicable Data Protection Laws for the collection and use of the Personal Data, including obtaining any necessary consents and authorizations (particularly for use by Customer for marketing purposes); (iii) ensuring you have the right to transfer, or provide access to, the Personal Data to us for Processing in accordance with the terms of the Agreement (including this DPA); (iv) ensuring that your Instructions to us regarding the Processing of Personal Data comply with applicable laws, including Data Protection Laws; and (v) complying with all laws (including Data Protection Laws) applicable to any emails or other content created, sent or managed through the Subscription Services, including those relating to obtaining consents (where required) to send emails, the content of the emails and its email deployment practices. You will inform us without undue delay if it is not able to comply with its responsibilities.</Typography>

			<Typography className={classes.body} variant="body2">Controller Instructions. The parties agree that the Agreement (including this DPA), together with your use of the Subscription Service in accordance with the Agreement, constitute your complete and final Instructions to us in relation to the Processing of Personal Data, and additional instructions outside the scope of the Instructions shall require prior written agreement between us and you.</Typography>

			<Typography className={classes.title} variant="h6">JOBSAGE OBLIGATIONS</Typography> 
			<Typography className={classes.body} variant="body2">Compliance with Instructions. We will only Process Personal Data for the purposes described in this DPA or as otherwise agreed within the scope of your lawful Instructions, except where and to the extent otherwise required by applicable law. We are not responsible for compliance with any Data Protection Laws applicable to you or your industry that are not generally applicable to us. </Typography>

			<Typography className={classes.body} variant="body2">Conflict of Laws. If we become aware that we cannot Process Personal Data in accordance with your Instructions due to a legal requirement under any applicable law, we will (i) promptly notify you of that legal requirement to the extent permitted by the applicable law; and (ii) where necessary, cease all Processing (other than merely storing and maintaining the security of the affected Personal Data) until such time as you issue new Instructions with which we are able to comply. If this provision is invoked, we will not be liable to you under the Agreement for any failure to perform the applicable Subscription Services until such time as you issue new lawful Instructions with regard to the Processing.</Typography>

			<Typography className={classes.body} variant="body2">Security. We will implement and maintain appropriate technical and organizational measures to protect Personal Data from Personal Data Breaches. Notwithstanding any provision to the contrary, we may modify or update the Security Measures at our discretion provided that such modification or update does not result in a material degradation in the protection offered by the Security Measures.</Typography>
			
			<Typography className={classes.body} variant="body2">Confidentiality. We will ensure that any personnel whom we authorize to Process Personal Data on our behalf is subject to appropriate confidentiality obligations (whether a contractual or statutory duty) with respect to that Personal Data. </Typography>

			<Typography className={classes.body} variant="body2">Personal Data Breaches. We will notify you without undue delay after it becomes aware of any Personal Data Breach and will provide timely information relating to the Personal Data Breach as it becomes known or reasonably requested by you. At your request, we will promptly provide you with such reasonable assistance as necessary to enable you to notify relevant Personal Data Breaches to competent authorities and/or affected Data Subjects, if you are required to do so under Data Protection Laws. </Typography>

			<Typography className={classes.body} variant="body2">Deletion or Return of Personal Data. We will delete or return all Customer Data, including Personal Data upon termination or expiration of your Subscription Service in accordance with the procedures and timeframes set out in the Agreement, save that this requirement shall not apply to the extent we are required by applicable law to retain some or all of the Customer Data, or to Customer Data it has archived on back-up systems, which data we will securely isolate and protect from any further Processing and delete in accordance with its deletion practices. You may request the deletion of your HubSpot account after expiration or termination of your subscription by sending a request here or by following the instructions found here. You may retrieve your Customer Data from your account in accordance with our ‘Retrieval of Customer Data’ sections throughout our Product Specific Terms.</Typography>

			<Typography className={classes.body} variant="body2">Sub-Processors. You agree that we may engage Sub-Processors to Process Personal Data on your behalf. we will impose data protection terms on the SubProcessors that provide at least the same level of protection for Personal Data as those in this DPA. We will remain responsible for each Sub-Processor’s compliance with the obligations of this DPA.</Typography>

			<Typography className={classes.title} variant="h6">Data Transfers </Typography>

			<Typography className={classes.body} variant="body2">You acknowledge and agree that we may access and Process Personal Data on a global basis as necessary to provide the Subscription Service in accordance with the Agreement, and in particular that Personal Data will be transferred to and Processed by Jobsage. in India & US and to other jurisdictions where Jobsage Affiliates and Sub-Processors have operations. We will ensure such transfers are made in compliance with the requirements of Data Protection Laws.</Typography>

			<Typography className={classes.title} variant="h6">PARTIES TO THIS DPA </Typography>

			<Typography className={classes.body} variant="body2">Permitted Affiliates. By accepting this Agreement, you enter into this DPA on behalf of yourself and, to the extent required under applicable Data Protection Laws, in the name and on behalf of your Permitted Affiliates, thereby establishing a separate DPA between us and each such Permitted Affiliate subject to the Agreement and the ‘General Provisions’ and ‘Parties to this DPA’ sections of this DPA. Each Permitted Affiliate agrees to be bound by the obligations under this DPA and, to the extent applicable, the Agreement. For the purposes of this DPA only, and except where indicated otherwise, the terms “Customer”, “you” and “your” will include you and such Permitted Affiliates.</Typography>

			<Typography className={classes.body} variant="body2">Authorization. The legal entity agreeing to this DPA as Customer represents that it is authorized to agree to and enter into this DPA for and on behalf of itself and, as applicable, each of its Permitted Affiliates.</Typography>

			<Typography className={classes.body} variant="body2">Remedies. Except where applicable Data Protection Laws require a Permitted Affiliate to exercise a right or seek any remedy under this DPA against us directly by itself, the parties agree that (i) solely the Customer entity that is the contracting party to the Agreement will exercise any right or seek any remedy any Permitted Affiliate may have under this DPA on behalf of its Affiliates, and (ii) the Customer entity that is the contracting party to the Agreement will exercise any such rights under this DPA not separately for each Permitted Affiliate individually but in a combined manner for itself and all of its Permitted Affiliates together. The Customer entity that is the contracting entity is responsible for coordinating all communication with us under the DPA and will be entitled to make and receive any communication related to this DPA on behalf of its Permitted Affiliates. </Typography>

			<Typography className={classes.body} variant="body2">Other rights. The parties agree that you will, when reviewing our compliance with this DPA pursuant to the ‘Demonstration of Compliance’ section, take all reasonable measures to limit any impact on us and our Affiliates by combining several audit requests carried out on behalf of the Customer entity that is the contracting party to the Agreement and all of its Permitted Affiliates in one single audit.</Typography>

		</div>
	);
}

export default React.memo(TermsAndConditionsContent);
