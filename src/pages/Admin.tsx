import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FiLock, FiLogOut, FiMail, FiRefreshCw, FiTrash2, FiUser } from 'react-icons/fi'
import {
  adminLogin,
  getAdminSubmissions,
  adminListJobPostings,
  adminCreateJobPosting,
  adminUpdateJobPosting,
  adminDeleteJobPosting,
  AdminContactRow,
  AdminJobRow,
  JobPostingAdmin,
} from '../services/api'

const TOKEN_KEY = 'tbg_admin_token'

function apiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const d = err.response?.data
    if (typeof d?.detail === 'string') return d.detail
    if (Array.isArray(d?.detail)) return d.detail.map((x: { msg?: string }) => x.msg || '').filter(Boolean).join(' ') || 'Request failed'
    if (d?.message) return d.message
  }
  return 'Something went wrong. Please try again.'
}

function resumeHref(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return url.startsWith('/') ? url : `/${url}`
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState<AdminContactRow[]>([])
  const [jobs, setJobs] = useState<AdminJobRow[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [tab, setTab] = useState<'contact' | 'jobs'>('contact')
  const [workspace, setWorkspace] = useState<'submissions' | 'postings'>('submissions')
  const [postings, setPostings] = useState<JobPostingAdmin[]>([])
  const [pgTitle, setPgTitle] = useState('')
  const [pgLoc, setPgLoc] = useState('')
  const [pgType, setPgType] = useState('Full-time')
  const [pgDesc, setPgDesc] = useState('')
  const [pgSort, setPgSort] = useState(0)
  const [postingMsg, setPostingMsg] = useState<string | null>(null)

  const loadData = useCallback(async (t: string) => {
    setFetchError(null)
    setLoading(true)
    try {
      const data = await getAdminSubmissions(t)
      setContacts(data.contacts)
      setJobs(data.job_applications)
    } catch {
      setFetchError('Could not load submissions. Try logging in again.')
      sessionStorage.removeItem(TOKEN_KEY)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) loadData(token)
  }, [token, loadData])

  const loadPostings = useCallback(async () => {
    if (!token) return
    setPostingMsg(null)
    try {
      const rows = await adminListJobPostings(token)
      setPostings(rows)
    } catch {
      setPostingMsg('Could not load job postings.')
    }
  }, [token])

  useEffect(() => {
    if (token && workspace === 'postings') loadPostings()
  }, [token, workspace, loadPostings])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoading(true)
    try {
      const res = await adminLogin(username, password)
      if (!res.success || !res.token) {
        setLoginError('Invalid username or password')
        return
      }
      sessionStorage.setItem(TOKEN_KEY, res.token)
      setToken(res.token)
      setPassword('')
    } catch (err) {
      setLoginError(apiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setContacts([])
    setJobs([])
    setPostings([])
  }

  const handleAddPosting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setPostingMsg(null)
    try {
      await adminCreateJobPosting(token, {
        title: pgTitle,
        location: pgLoc,
        job_type: pgType,
        description: pgDesc.trim() || undefined,
        sort_order: pgSort,
        is_active: true,
      })
      setPgTitle('')
      setPgLoc('')
      setPgType('Full-time')
      setPgDesc('')
      setPgSort(0)
      await loadPostings()
    } catch (err) {
      setPostingMsg(apiErrorMessage(err))
    }
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString()
    } catch {
      return iso
    }
  }

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass rounded-2xl border border-white/10 p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-indigo-500/20 text-cyan-400">
              <FiLock className="text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Team inbox</h1>
              <p className="text-sm text-white/60">Sign in with the admin credentials configured on the server (.env).</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm" role="alert">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="block text-sm font-medium text-white/90 mb-1">
                Username
              </label>
              <input
                id="admin-user"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-dark w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-pass" className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark w-full"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 btn-glow text-white font-semibold disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-primary py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-white/60 text-sm mt-1">
              {workspace === 'submissions'
                ? 'Contact form and job applications'
                : 'Job postings shown on the Careers page'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-white/15 p-1 bg-white/5">
              <button
                type="button"
                onClick={() => setWorkspace('submissions')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  workspace === 'submissions' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                Submissions
              </button>
              <button
                type="button"
                onClick={() => setWorkspace('postings')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  workspace === 'postings' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                Careers listings
              </button>
            </div>
            <button
              type="button"
              onClick={() => (workspace === 'submissions' ? loadData(token) : loadPostings())}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/10 disabled:opacity-50"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/10"
            >
              <FiLogOut />
              Log out
            </button>
          </div>
        </div>

        {fetchError && workspace === 'submissions' && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-sm">{fetchError}</div>
        )}
        {postingMsg && workspace === 'postings' && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-100 text-sm">{postingMsg}</div>
        )}

        {workspace === 'postings' ? (
          <div className="space-y-10">
            <motion.form
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddPosting}
              className="card-glass p-6 border border-white/10 space-y-4 max-w-2xl"
            >
              <h2 className="text-lg font-bold text-white">Add job posting</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">Title</label>
                  <input
                    value={pgTitle}
                    onChange={(e) => setPgTitle(e.target.value)}
                    className="input-dark w-full"
                    required
                    placeholder="e.g. Software Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Location</label>
                  <input
                    value={pgLoc}
                    onChange={(e) => setPgLoc(e.target.value)}
                    className="input-dark w-full"
                    required
                    placeholder="Remote or hybrid"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Type</label>
                  <input
                    value={pgType}
                    onChange={(e) => setPgType(e.target.value)}
                    className="input-dark w-full"
                    required
                    placeholder="Full-time"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Sort order</label>
                  <input
                    type="number"
                    value={pgSort}
                    onChange={(e) => setPgSort(Number(e.target.value))}
                    className="input-dark w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Description (optional)</label>
                <textarea
                  value={pgDesc}
                  onChange={(e) => setPgDesc(e.target.value)}
                  rows={3}
                  className="input-dark w-full resize-none"
                  placeholder="Short summary for the listing"
                />
              </div>
              <button type="submit" className="btn-glow px-6 py-2.5 text-white font-semibold text-sm">
                Publish posting
              </button>
            </motion.form>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Current postings</h2>
              {postings.length === 0 ? (
                <p className="text-white/50 text-sm">No postings yet.</p>
              ) : (
                postings.map((p) => (
                  <div
                    key={p.id}
                    className="card-glass p-4 border border-white/10 flex flex-wrap items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="text-sm text-white/55 mt-1">
                        {p.location}, {p.job_type}, order {p.sort_order}
                      </p>
                      {!p.is_active && <p className="text-xs text-amber-400/90 mt-1">Hidden from Careers</p>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!token) return
                          try {
                            await adminUpdateJobPosting(token, p.id, { is_active: !p.is_active })
                            await loadPostings()
                          } catch (err) {
                            setPostingMsg(apiErrorMessage(err))
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg border border-white/20 text-white/85 text-xs font-medium hover:bg-white/10"
                      >
                        {p.is_active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!token || !confirm(`Delete "${p.title}"?`)) return
                          try {
                            await adminDeleteJobPosting(token, p.id)
                            await loadPostings()
                          } catch (err) {
                            setPostingMsg(apiErrorMessage(err))
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-300 text-xs font-medium hover:bg-red-500/10"
                      >
                        <FiTrash2 className="text-sm" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <>
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-1">
          <button
            type="button"
            onClick={() => setTab('contact')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${
              tab === 'contact' ? 'text-cyan-400 bg-white/5' : 'text-white/60 hover:text-white'
            }`}
          >
            Contact ({contacts.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('jobs')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${
              tab === 'jobs' ? 'text-cyan-400 bg-white/5' : 'text-white/60 hover:text-white'
            }`}
          >
            Jobs ({jobs.length})
          </button>
        </div>

        {loading && contacts.length === 0 && jobs.length === 0 ? (
          <p className="text-white/50 text-center py-16">Loading…</p>
        ) : tab === 'contact' ? (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <p className="text-white/50 text-center py-12">No contact submissions yet.</p>
            ) : (
              contacts.map((c) => (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-glass p-5 border border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <FiUser className="text-cyan-400 flex-shrink-0" />
                      {c.full_name}
                    </div>
                    <span className="text-xs text-white/50">{formatDate(c.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    <FiMail className="text-cyan-400/80 flex-shrink-0" />
                    <a href={`mailto:${c.email}`} className="hover:text-cyan-400">
                      {c.email}
                    </a>
                    <span className="text-white/40">, </span>
                    <span>{c.phone}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-indigo-300/90 mb-1">Service</p>
                  <p className="text-white/90 text-sm mb-3">{c.service_interest}</p>
                  {c.company_name && (
                    <p className="text-sm text-white/60 mb-2">
                      Company: <span className="text-white/80">{c.company_name}</span>
                    </p>
                  )}
                  {c.location && (
                    <p className="text-sm text-white/60 mb-2">
                      Location: <span className="text-white/80">{c.location}</span>
                    </p>
                  )}
                  <p className="text-sm text-white/80 whitespace-pre-wrap border-t border-white/10 pt-3 mt-2">{c.message}</p>
                  {c.status && <p className="text-xs text-white/40 mt-2">Status: {c.status}</p>}
                </motion.article>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-white/50 text-center py-12">No job applications yet.</p>
            ) : (
              jobs.map((j) => (
                <motion.article
                  key={j.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-glass p-5 border border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <FiUser className="text-cyan-400 flex-shrink-0" />
                      {j.full_name}
                    </div>
                    <span className="text-xs text-white/50">{formatDate(j.created_at)}</span>
                  </div>
                  <p className="text-sm text-cyan-400/90 font-medium mb-2">{j.position}</p>
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
                    <FiMail className="text-cyan-400/80 flex-shrink-0" />
                    <a href={`mailto:${j.email}`} className="hover:text-cyan-400">
                      {j.email}
                    </a>
                    <span className="text-white/40">, </span>
                    <span>{j.phone}</span>
                  </div>
                  {j.resume_url && (
                    <p className="text-sm text-white/70 mb-1">
                      Resume:{' '}
                      <a
                        href={resumeHref(j.resume_url)}
                        className="text-cyan-400 hover:underline break-all"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {j.resume_url.startsWith('/uploads') ? 'Download uploaded file' : j.resume_url}
                      </a>
                    </p>
                  )}
                  {j.portfolio_url && (
                    <p className="text-sm text-white/70 mb-1">
                      Portfolio:{' '}
                      <a href={j.portfolio_url} className="text-cyan-400 hover:underline break-all" target="_blank" rel="noreferrer">
                        {j.portfolio_url}
                      </a>
                    </p>
                  )}
                  {j.cover_letter && (
                    <p className="text-sm text-white/80 whitespace-pre-wrap border-t border-white/10 pt-3 mt-3">{j.cover_letter}</p>
                  )}
                  {j.status && <p className="text-xs text-white/40 mt-2">Status: {j.status}</p>}
                </motion.article>
              ))
            )}
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}
