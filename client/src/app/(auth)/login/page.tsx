'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const testUser = { username: "testuser", password: "password123" };

    const handleLogin = () => {
        if (username === testUser.username && password === testUser.password) {
            alert("Login successful!");
            setError("");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login">
            <h1 className="h1">Login</h1>
            <div>
                <Label>
                    Username:
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Password:
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Label>
            </div>
            <Button onClick={handleLogin}>Login</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;