import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login_key"],
    onSuccess: (response) => {
      const user = response?.data;
      const token = response?.token;

      if (user && token) {
        login(user, token); 
        toast.success("Login successful");
        setTimeout(() => {
        const path = user.role === "admin" ? "/admin" : "/home";
        console.log("➡️ Navigating to", path);
        navigate(path);
        }, 0);
      } else {
        toast.error("Invalid login response");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed");
    },
  });
};






// import { useMutation } from "@tanstack/react-query";
// import { loginUserService } from "../services/authService";
// import { toast } from "react-toastify";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";

// export const useLoginUser = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: loginUserService,
//     mutationKey: ["login_key"],
//     onSuccess: (response) => {
//       const user = response?.data;
//       const token = response?.token;

//       if (user && token) {
//         login(user, token); // Save to context/localStorage
//         toast.success("Login successful");

//         // ✅ Add debug log before navigation
//         console.log("🌟 About to navigate based on role:", user.role);
//         setTimeout(() => {
//           const path = user.role === "admin" ? "/admin" : "/home";
//           console.log("➡️ Navigating to", path);
//           navigate(path);
//         }, 0);

//       } else {
//         toast.error("Invalid login response");
//       }
//     },
//     onError: (error) => {
//       toast.error(error?.message || "Login failed");
//     },
//   });
// };
