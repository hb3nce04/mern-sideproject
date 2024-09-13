import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(JSON.stringify(user)) || null);

	const login = async () => {};

	const logout = async () => {};

	useEffect(() => {}, [user]);

	return (
		<AuthContext.Provider value={(user, login, logout)}>
			{children}
		</AuthContext.Provider>
	);
};
