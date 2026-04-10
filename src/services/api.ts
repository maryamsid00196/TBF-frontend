import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''
const API_PREFIX = API_BASE ? `${API_BASE.replace(/\/$/, '')}/api` : '/api'

export const api = axios.create({
  baseURL: API_PREFIX,
  headers: { 'Content-Type': 'application/json' },
})

export interface ContactPayload {
  full_name: string
  company_name?: string
  email: string
  phone: string
  service_interest: string
  location?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  contact_id?: number
}

export interface JobApplicationPayload {
  full_name: string
  email: string
  phone: string
  position: string
  resume_url?: string
  cover_letter?: string
  portfolio_url?: string
}

export interface JobApplicationResponse {
  success: boolean
  message: string
  application_id?: number
}

export async function submitContact(data: ContactPayload): Promise<ContactResponse> {
  const { data: res } = await api.post<ContactResponse>('/contact', data)
  return res
}

export async function submitJobApplication(
  data: JobApplicationPayload,
  resumeFile?: File | null,
): Promise<JobApplicationResponse> {
  const fd = new FormData()
  fd.append('full_name', data.full_name)
  fd.append('email', data.email)
  fd.append('phone', data.phone)
  fd.append('position', data.position)
  if (data.resume_url) fd.append('resume_url', data.resume_url)
  if (data.portfolio_url) fd.append('portfolio_url', data.portfolio_url)
  if (data.cover_letter) fd.append('cover_letter', data.cover_letter)
  if (resumeFile) fd.append('resume', resumeFile)
  const { data: res } = await axios.post<JobApplicationResponse>(`${API_PREFIX}/job-application`, fd)
  return res
}

export interface JobPostingPublic {
  id: number
  title: string
  location: string
  job_type: string
  description?: string | null
  sort_order: number
}

export async function getJobPostings(): Promise<JobPostingPublic[]> {
  const { data } = await api.get<JobPostingPublic[]>('/job-postings')
  return data
}

export interface JobPostingAdmin extends JobPostingPublic {
  is_active: boolean
  created_at: string
  updated_at?: string | null
}

export async function adminListJobPostings(token: string): Promise<JobPostingAdmin[]> {
  const { data } = await api.get<JobPostingAdmin[]>('/admin/job-postings', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function adminCreateJobPosting(
  token: string,
  body: {
    title: string
    location: string
    job_type: string
    description?: string
    sort_order?: number
    is_active?: boolean
  },
): Promise<JobPostingAdmin> {
  const { data } = await api.post<JobPostingAdmin>('/admin/job-postings', body, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function adminUpdateJobPosting(
  token: string,
  id: number,
  body: Partial<{
    title: string
    location: string
    job_type: string
    description: string | null
    sort_order: number
    is_active: boolean
  }>,
): Promise<JobPostingAdmin> {
  const { data } = await api.put<JobPostingAdmin>(`/admin/job-postings/${id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function adminDeleteJobPosting(token: string, id: number): Promise<void> {
  await api.delete(`/admin/job-postings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function getServices(): Promise<{ services: string[] }> {
  const { data } = await api.get<{ services: string[] }>('/services')
  return data
}

export interface AdminContactRow {
  id: number
  full_name: string
  company_name?: string | null
  email: string
  phone: string
  service_interest: string
  location?: string | null
  message: string
  created_at: string
  status?: string
}

export interface AdminJobRow {
  id: number
  full_name: string
  email: string
  phone: string
  position: string
  resume_url?: string | null
  cover_letter?: string | null
  portfolio_url?: string | null
  created_at: string
  status?: string
}

export interface AdminSubmissions {
  contacts: AdminContactRow[]
  job_applications: AdminJobRow[]
}

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  const { data } = await api.post<{ success: boolean; token?: string; message?: string }>('/admin/login', { username, password })
  return data
}

export async function getAdminSubmissions(token: string): Promise<AdminSubmissions> {
  const { data } = await api.get<AdminSubmissions>('/admin/submissions', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
