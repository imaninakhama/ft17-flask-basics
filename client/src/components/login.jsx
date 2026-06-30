import { useState } from 'react';
import { serverUrl } from '../App';

export default function Login() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	function handleSubmit(event) {
		event.preventDefault();

		fetch(`${serverUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email,
				password: user.password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUser({
					email: '',
					password: '',
				});
			});
	}

	return (
		<div>
			Login
			<form
				onSubmit={handleSubmit}
				className="border p-10 flex flex-col gap-5"
			>
				<input
					type="email"
					placeholder="Enter email address"
					value={user.email}
					className="border outline-amber-500 rounded-md p-2"
					onChange={(event) =>
						setUser({
							...user,
							email: event.target.value,
						})
					}
				/>
				<input
					type="password"
					placeholder="Enter password"
					className="border outline-amber-500 rounded-md p-2"
					value={user.password}
					onChange={(event) =>
						setUser({
							...user,
							password: event.target.value,
						})
					}
				/>
				<button className="bg-amber-500 p-2 rounded-md cursor-pointer text-white">
					Login
				</button>
			</form>
		</div>
	);
}
