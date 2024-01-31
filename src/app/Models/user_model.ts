interface User {
  openai_key: string | null;
  first_name: string;
  last_name: string;
  dob: string;
  designation: string;
  org_name: string;
  description: string;
  email: string;
  personality: string;
  password: string;
}

export default User;
