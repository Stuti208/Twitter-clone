import { createContext } from "react";

export const profileImageContext = createContext('');
export const loggedInUserContext = createContext({});
export const editStatusContext=createContext(false);
export const postStatusContext=createContext(false);
export const bookmarkStatusContext=createContext(false);
export const likeStatusContext = createContext(false);
export const notificationsEnabledContext = createContext(false);
