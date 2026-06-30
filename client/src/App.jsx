import { useEffect, useState } from 'react';
import CustomerCard from './components/customer-card';
import CustomerForm from './components/customer-form';
import Login from './components/login';

// this is not the best way. Why is it not recommended? What is the best way?
export const serverUrl = 'http://127.0.0.1:5000';

function App() {
	const [customers, setCustomers] = useState([]);

	function fetchCustomers() {
		fetch(`${serverUrl}/customers`)
			.then((res) => res.json())
			.then((data) => setCustomers(data));
	}
	useEffect(() => {
		fetchCustomers();
	}, []);

	// tanstack-query -> best option
	// onAddCustomer implementation
	function handleAddCustomer(newCustomer) {
		const customerDetails = {
			firstName: newCustomer.firstName,
			lastName: newCustomer.lastName,
			email: newCustomer.email,
			phone: newCustomer.phone,
		};

		fetch(`${serverUrl}/customers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customerDetails),
		})
			.then((res) => res.json())
			.then(() => {
				fetchCustomers();
			})
			.catch((err) => console.error('There was an error', err));
	}

	return (
		<main className="h-screen max-w-7xl mx-auto">
			<div className="grid grid-cols-3 gap-5 h-full py-10 px-5">
				<section className="col-span-1 flex flex-col gap-10 ">
					<CustomerForm onAddCustomer={handleAddCustomer} />

					<Login />
				</section>
				<section className="col-span-2 grid grid-cols-3 gap-5 h-fit">
					{customers.map((customer) => (
						<CustomerCard
							key={customer.id}
							firstName={customer.first_name}
							lastName={customer.last_name}
							email={customer.email}
							phone={customer.phone}
						/>
					))}
				</section>
			</div>
		</main>
	);
}

export default App;
