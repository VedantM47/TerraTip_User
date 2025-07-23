import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ Password Reset API
export async function resetPasswordApi({
  password,
  confirmPassword,
  token,
  email,
  name,
  phone,
}: {
  password: string;
  confirmPassword: string;
  token: string;
  email: string;
  name: string;
  phone: string;
}) {
  const res = await axios.put(
    `${baseUrl}/client/user/password-reset`,
    { password, confirmPassword },
    {
      params: { token, email, name, phone },
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.data;
}

// ✅ Login API
export async function loginApi({ email, password }: { email: string; password: string }) {
  const res = await axios.post(
    `${baseUrl}/client/user/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
