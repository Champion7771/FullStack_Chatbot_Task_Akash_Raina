export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface IEnquiry {
  name: string;
  email: string;
  phone: string;
  userType: string;
  interest: string;
  message: string;
  status?: EnquiryStatus;
}
