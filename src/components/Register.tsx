

export function Register (){

	<div className="container">
		<form action="" className="form">

			<img src="./images/huertas-login.jpg" alt="ecohuertas" />

			<h2 className="form-title">Sign In</h2>

			<div className="form-inputs">

				<label htmlFor="userName">

            User Name: <input type="text" id="userName" />

				</label>

				<label htmlFor="name">

            Name: <input type="text" id="name" />

				</label>

				<label htmlFor="lastName">

            Lastname: <input type="text" id="lastName" />
			
				</label>
				<label htmlFor="email">
            Email: <input type="text" id="email" />
				</label>
				<label htmlFor="pass">
            Password: <input type="password" id="pass" />
				</label>
			</div>
			<button type="submit" className="sendBtn">Submit</button>
		</form>
	</div>;
}