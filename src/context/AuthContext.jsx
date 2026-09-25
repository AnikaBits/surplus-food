import { createContext, useContext, useState, useEffect } from "react";
import { initialUsers, initialDonations, initialMoneyDonations } from "../data/mockData";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  USERS: "foodshare_users",
  DONATIONS: "foodshare_donations",
  MONEY_DONATIONS: "foodshare_money_donations",
  CURRENT_USER: "foodshare_current_user",
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [moneyDonations, setMoneyDonations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedDonations = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    const storedMoneyDonations = localStorage.getItem(STORAGE_KEYS.MONEY_DONATIONS);
    const storedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    setUsers(storedUsers ? JSON.parse(storedUsers) : initialUsers);
    setDonations(storedDonations ? JSON.parse(storedDonations) : initialDonations);
    setMoneyDonations(
      storedMoneyDonations ? JSON.parse(storedMoneyDonations) : initialMoneyDonations
    );
    setCurrentUser(storedCurrentUser ? JSON.parse(storedCurrentUser) : null);

    if (!storedUsers) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    }
    if (!storedDonations) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(initialDonations));
    }
    if (!storedMoneyDonations) {
      localStorage.setItem(STORAGE_KEYS.MONEY_DONATIONS, JSON.stringify(initialMoneyDonations));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users, loading]);

  useEffect(() => {
    if (!loading) localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations, loading]);

  useEffect(() => {
    if (!loading)
      localStorage.setItem(STORAGE_KEYS.MONEY_DONATIONS, JSON.stringify(moneyDonations));
  }, [moneyDonations, loading]);

  function register({ name, email, password, role, donorType }) {
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, message: "এই ইমেইল দিয়ে আগে থেকেই একটা অ্যাকাউন্ট আছে।" };
    }

    const newUser = {
      id: `${role}${Date.now()}`,
      name,
      email,
      password,
      role,
      status: "pending",
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6ba368&color=fff`,
      ...(role === "donor" ? { donorType, totalDonations: 0, totalMealsDonated: 0 } : {}),
      ...(role === "ngo" ? { totalFoodReceived: 0, totalPeopleHelped: 0 } : {}),
    };

    setUsers((prev) => [...prev, newUser]);
    return {
      success: true,
      message: "রেজিস্ট্রেশন সম্পন্ন হয়েছে! অ্যাডমিন অ্যাপ্রুভ করার পর আপনি লগইন করতে পারবেন।",
    };
  }

  function login(email, password) {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।" };
    }
    if (user.status === "pending") {
      return { success: false, message: "আপনার অ্যাকাউন্ট এখনো অ্যাডমিন অ্যাপ্রুভালের অপেক্ষায় আছে।" };
    }
    if (user.status === "blocked") {
      return { success: false, message: "আপনার অ্যাকাউন্ট ব্লক করা হয়েছে। অ্যাডমিনের সাথে যোগাযোগ করুন।" };
    }

    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  function approveUser(userId) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "approved" } : u))
    );
  }

  function rejectUser(userId) {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }

  function toggleBlockUser(userId) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "blocked" ? "approved" : "blocked" }
          : u
      )
    );
  }

  const value = {
    users,
    donations,
    moneyDonations,
    currentUser,
    loading,
    register,
    login,
    logout,
    approveUser,
    rejectUser,
    toggleBlockUser,
    setDonations,
    setMoneyDonations,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth অবশ্যই AuthProvider এর ভেতরে ব্যবহার করতে হবে।");
  }
  return context;
}