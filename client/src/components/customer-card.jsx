export default function CustomerCard({ firstName, lastName, email, phone }) {
	return (
		<div className="bg-white rounded-2xl  p-6  w-full h-fit border border-gray-700">
			<div className="flex items-center gap-4 mb-4">
				<div className="bg-amber-100 text-amber-600 rounded-xl w-12 h-12 flex items-center justify-center text-lg font-bold shrink-0">
					{firstName?.[0]}
					{lastName?.[0]}
				</div>
				<div>
					<h2 className="text-xl font-semibold text-gray-800">
						{firstName} {lastName}
					</h2>
					<span className="text-xs text-amber-500 font-medium uppercase tracking-wide">
						Customer
					</span>
				</div>
			</div>
			<div className="space-y-2 text-sm text-gray-600">
				<div className="flex items-center gap-2">
					{/* <span className="text-gray-400">✉</span> */}
					<span>{email}</span>
				</div>
				<div className="flex items-center gap-2">
					{/* <span className="text-gray-400">📞</span> */}
					<span>{phone}</span>
				</div>
			</div>
		</div>
	);
}
