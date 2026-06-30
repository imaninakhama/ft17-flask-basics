import { useState } from 'react';

export default function CustomerForm({ onAddCustomer }) {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});

	function handleSubmit(event) {
		event.preventDefault();

		onAddCustomer(user);

		// clear the form
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		});
	}

	return (
		<div>
			<div className="border rounded-2xl py-10 px-5 flex flex-col gap-5">
				<div className="flex flex-col gap-1">
					<h2 className="text-3xl font-bold font-barlow">
						Customer Details
					</h2>
					<p className="text-base text-gray-600">
						Enter the customer details below
					</p>

					<form
						className="flex flex-col gap-5 mt-10"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col  gap-5 w-full">
							<input
								type="text"
								placeholder="Firstname"
								className="border outline-amber-500 rounded-md p-2"
								value={user.firstName}
								onChange={(event) =>
									setUser({
										...user,
										firstName: event.target.value,
									})
								}
								required
							/>
							<input
								type="text"
								placeholder="Lastname"
								className="border outline-amber-500 rounded-md p-2"
								value={user.lastName}
								onChange={(event) =>
									setUser({
										...user,
										lastName: event.target.value,
									})
								}
								required
							/>
						</div>

						<input
							type="email"
							className="border outline-amber-500 rounded-md p-2"
							placeholder="Email Address"
							value={user.email}
							onChange={(event) =>
								setUser({
									...user,
									email: event.target.value,
								})
							}
							required
						/>
						<input
							type="tel"
							className="border outline-amber-500 rounded-md p-2"
							placeholder="Phone number"
							value={user.phone}
							onChange={(event) =>
								setUser({
									...user,
									phone: event.target.value,
								})
							}
						/>

						<button className="bg-amber-500 p-2 rounded-md cursor-pointer text-white">
							Submit
						</button>

						<p className="text-xs text-gray-400 text-center">
							By submitting the form you accept our privacy policy
							& terms and conditions
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
