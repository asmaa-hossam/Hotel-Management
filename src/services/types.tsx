export type RegisterFormInputs = {
  email: string;
  country: string;
  confirmPassword: string;
  phoneNumber: string;
  userName: string;
  password: string;
  role: string;
  profileImage: File | null;
};

//ads
export type ModalType = "view" | "edit" | "create" | null;
