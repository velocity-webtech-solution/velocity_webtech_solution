"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDot,
  Download,
  Eye,
  Filter,
  Mail,
  MailCheck,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import EmailDialog from "../../../components/email-dialog/EmailDialog";
import AdminShell from "../AdminShell";
import {
  fetchContactSubmissions,
  fetchEnquiryEmails,
  fetchEnquiryReplyHistoryByEmail,
} from "../../api/apiservice";

const BASE_PATH = "";
const PAGE_SIZE = 10;

const leadSteps = ["New", "Contacted", "Qualified", "Proposal", "Converted"];

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function mapSubmissionToEnquiry(submission) {
  return {
    id: submission.id,
    name: submission.full_name || submission.name || "-",
    phone: submission.phone || "-",
    email: submission.email || "-",
    requirement: submission.service || "-",
    budget: "Not specified",
    startDate: "Not specified",
    emailSent: Boolean(submission.email_sent),
    status: submission.email_sent ? "Contacted" : "New",
    date: formatDate(submission.created_at),
    dateTime: formatDateTime(submission.created_at),
    createdAt: submission.created_at || "",
    note: submission.message || "No project details provided.",
  };
}

function groupEnquiriesByEmail(enquiries) {
  const groups = new Map();

  enquiries.forEach((enquiry) => {
    const emailKey = (enquiry.email || "").trim().toLowerCase();
    const key = emailKey || `enquiry-${enquiry.id}`;
    const currentGroup = groups.get(key) || {
      key,
      email: enquiry.email,
      records: [],
    };

    currentGroup.records.push(enquiry);
    groups.set(key, currentGroup);
  });

  return [...groups.values()]
    .map((group) => {
      const records = [...group.records].sort(
        (first, second) =>
          new Date(second.createdAt) - new Date(first.createdAt),
      );
      const latest = records[0];

      return {
        ...latest,
        groupKey: group.key,
        records,
        recordCount: records.length,
        emailSent: records.some((record) => record.emailSent),
        status: records.some((record) => record.emailSent)
          ? "Contacted"
          : "New",
      };
    })
    .sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
    );
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedEmailKey, setExpandedEmailKey] = useState("");
  const [emailDialog, setEmailDialog] = useState({
    open: false,
    enquiry: null,
    loading: false,
    error: "",
    messages: [],
    replies: [],
    submissions: [],
    fromAccount: "",
  });
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });
  const [summary, setSummary] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

  useEffect(() => {
    let active = true;

    async function loadSubmissions() {
      setLoading(true);
      setErrorMessage("");

      try {
        const data = await fetchContactSubmissions({
          page: pagination.page,
          pageSize: PAGE_SIZE,
        });
        console.log("Enquiries Data =====> ", data);

        const submissions = Array.isArray(data) ? data : data.results || [];
        const mappedEnquiries = submissions.map(mapSubmissionToEnquiry);

        if (!active) {
          return;
        }

        setEnquiries(mappedEnquiries);
        setSelectedEnquiry(null);
        setPagination({
          count: data.count ?? mappedEnquiries.length,
          page: data.page ?? pagination.page,
          pageSize: data.page_size ?? PAGE_SIZE,
          totalPages: data.total_pages || 1,
          hasNext: Boolean(data.has_next),
          hasPrevious: Boolean(data.has_previous),
        });
        setSummary({
          total: data.stats?.total ?? data.count ?? mappedEnquiries.length,
          new:
            data.stats?.new ??
            mappedEnquiries.filter((enquiry) => enquiry.status === "New")
              .length,
          contacted:
            data.stats?.contacted ??
            mappedEnquiries.filter((enquiry) => enquiry.status === "Contacted")
              .length,
          converted: data.stats?.converted ?? 0,
        });
      } catch (error) {
        if (active) {
          setErrorMessage(error.message || "Unable to load enquiries.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSubmissions();

    return () => {
      active = false;
    };
  }, [pagination.page]);

  const filteredEnquiries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const groupedEnquiries = groupEnquiriesByEmail(enquiries);

    if (!search) {
      return groupedEnquiries;
    }

    return groupedEnquiries.filter((group) =>
      group.records.some((enquiry) =>
        [
          enquiry.name,
          enquiry.phone,
          enquiry.email,
          enquiry.requirement,
          enquiry.note,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search),
      ),
    );
  }, [enquiries, searchTerm]);

  const stats = useMemo(() => {
    return [
      {
        label: "Total Enquiries",
        value: summary.total,
        note: "All time enquiries",
        icon: UsersRound,
      },
      {
        label: "New Enquiries",
        value: summary.new,
        note: "Requires attention",
        icon: MailCheck,
      },
      {
        label: "Contacted",
        value: summary.contacted,
        note: "Email sent leads",
        icon: Phone,
      },
      {
        label: "Converted",
        value: summary.converted,
        note: "Successful leads",
        icon: CheckCircle2,
      },
    ];
  }, [summary]);

  const pageNumbers = useMemo(() => {
    const totalPages = pagination.totalPages;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const start = Math.max(1, Math.min(pagination.page - 1, totalPages - 4));

    return Array.from({ length: 3 }, (_, index) => start + index);
  }, [pagination.page, pagination.totalPages]);

  function handlePageChange(page) {
    if (page < 1 || page > pagination.totalPages || page === pagination.page) {
      return;
    }

    setSelectedEnquiry(null);
    setExpandedEmailKey("");
    setPagination((current) => ({
      ...current,
      page,
    }));
  }

  async function handleEmailDialogOpen(enquiry, options = {}) {
    const showSingleService = Boolean(options.showSingleService);
    const records = showSingleService
      ? [enquiry]
      : enquiry.records || [enquiry];

    setEmailDialog({
      open: true,
      enquiry,
      loading: true,
      error: "",
      messages: [],
      replies: [],
      submissions: records,
      fromAccount: "",
    });

    try {
      const [data, historyData] = await Promise.all([
        fetchEnquiryEmails({
          email: enquiry.email,
          service: showSingleService ? enquiry.requirement : "",
          message: showSingleService ? enquiry.note : "",
        }),
        fetchEnquiryReplyHistoryByEmail(enquiry.email),
      ]);
      const submissions = showSingleService
        ? records
        : (historyData.submissions || []).map(mapSubmissionToEnquiry);

      setEmailDialog({
        open: true,
        enquiry: showSingleService ? enquiry : submissions[0] || enquiry,
        loading: false,
        error: "",
        messages: data.results || [],
        replies: historyData.results || [],
        submissions: submissions.length ? submissions : records,
        fromAccount: data.from_account || "",
      });
    } catch (error) {
      setEmailDialog({
        open: true,
        enquiry,
        loading: false,
        error: error.message || "Unable to fetch emails.",
        messages: [],
        replies: [],
        submissions: records,
        fromAccount: "",
      });
    }
  }

  function handleEmailDialogClose() {
    setEmailDialog({
      open: false,
      enquiry: null,
      loading: false,
      error: "",
      messages: [],
      replies: [],
      submissions: [],
      fromAccount: "",
    });
  }

  return (
    <AdminShell>
      <section className="enquiry-stat-grid" aria-label="Enquiry summary">
        {stats.map(({ label, value, note, icon: Icon }) => (
          <article key={label}>
            <span>
              <Icon size={27} />
            </span>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          </article>
        ))}
      </section>

      <section
        className={`enquiry-workspace ${selectedEnquiry ? "is-open" : ""}`}
      >
        <article className="enquiry-list-card">
          <div className="enquiry-toolbar">
            <label>
              <Search size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, phone, email, requirement..."
              />
            </label>
            <button type="button">
              <Filter size={16} />
              Filter
            </button>
            <button type="button">
              <Download size={16} />
              Export Excel
            </button>
          </div>

          <div className="enquiry-table-wrap">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th aria-label="Expand row"></th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Email Sent</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="enquiry-table-message" colSpan={8}>
                      Loading enquiries...
                    </td>
                  </tr>
                )}

                {!loading && errorMessage && (
                  <tr>
                    <td className="enquiry-table-message error" colSpan={8}>
                      {errorMessage}
                    </td>
                  </tr>
                )}

                {!loading &&
                  !errorMessage &&
                  filteredEnquiries.length === 0 && (
                    <tr>
                      <td className="enquiry-table-message" colSpan={8}>
                        No enquiries found.
                      </td>
                    </tr>
                  )}

                {!loading &&
                  !errorMessage &&
                  filteredEnquiries.map((enquiry, index) => {
                    const isExpanded = expandedEmailKey === enquiry.groupKey;

                    return (
                      <Fragment key={enquiry.groupKey}>
                        <tr
                          className={[
                            selectedEnquiry?.groupKey === enquiry.groupKey
                              ? "selected"
                              : "",
                            isExpanded ? "expanded" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() =>
                            setExpandedEmailKey((current) =>
                              current === enquiry.groupKey
                                ? ""
                                : enquiry.groupKey,
                            )
                          }
                        >
                          <td>
                            {(pagination.page - 1) * pagination.pageSize +
                              index +
                              1}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="enquiry-row-toggle"
                              onClick={(event) => {
                                event.stopPropagation();
                                setExpandedEmailKey((current) =>
                                  current === enquiry.groupKey
                                    ? ""
                                    : enquiry.groupKey,
                                );
                              }}
                              aria-label={
                                isExpanded
                                  ? `Collapse ${enquiry.email} records`
                                  : `Expand ${enquiry.email} records`
                              }
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </td>
                          <td>{enquiry.name}</td>
                          <td>{enquiry.phone}</td>
                          <td>
                            <button
                              type="button"
                              className="enquiry-email-toggle"
                              onClick={(event) => {
                                event.stopPropagation();
                                setExpandedEmailKey((current) =>
                                  current === enquiry.groupKey
                                    ? ""
                                    : enquiry.groupKey,
                                );
                              }}
                              aria-expanded={isExpanded}
                            >
                              {enquiry.email}
                              {enquiry.recordCount > 1 && (
                                <span>{enquiry.recordCount} records</span>
                              )}
                            </button>
                          </td>
                          <td>
                            <span
                              className={`email-sent-pill ${
                                enquiry.emailSent ? "sent" : "pending"
                              }`}
                            >
                              {enquiry.emailSent ? "Yes" : "No"}
                            </span>
                          </td>
                          <td>{enquiry.date}</td>
                          <td>
                            <div className="enquiry-action-buttons">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedEnquiry(enquiry);
                                }}
                                aria-label={`View ${enquiry.name}`}
                              >
                                <Eye size={16} />
                              </button>
                              {/* <button
                                type="button"
                                className="enquiry-mail-action"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleEmailDialogOpen(enquiry);
                                }}
                                aria-label={`Email ${enquiry.name}`}
                              >
                                <Mail size={16} />
                              </button> */}
                            </div>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="enquiry-expanded-row">
                            <td colSpan={8}>
                              <div className="enquiry-email-records">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Service</th>
                                      <th>Enquiries Message</th>
                                      <th>Date & Time</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {enquiry.records.map((record) => (
                                      <tr key={record.id}>
                                        <td>{record.requirement}</td>
                                        <td>
                                          <span className="enquiry-message-preview">
                                            {record.note}
                                          </span>
                                        </td>
                                        <td>{record.dateTime}</td>
                                        <td>
                                          <button
                                            type="button"
                                            className="enquiry-mail-action"
                                            onClick={() =>
                                              handleEmailDialogOpen(record, {
                                                showSingleService: true,
                                              })
                                            }
                                            aria-label={`Open email history for ${record.requirement}`}
                                          >
                                            <Mail size={15} />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <footer className="enquiry-list-footer">
            <span>
              Showing{" "}
              {filteredEnquiries.length
                ? (pagination.page - 1) * pagination.pageSize + 1
                : 0}{" "}
              to{" "}
              {(pagination.page - 1) * pagination.pageSize +
                filteredEnquiries.length}{" "}
              of {pagination.count} entries
            </span>
            {pagination.totalPages > 1 && (
              <div>
                <button
                  type="button"
                  disabled={!pagination.hasPrevious || loading}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={page === pagination.page ? "active" : ""}
                    disabled={loading}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                {pageNumbers[pageNumbers.length - 1] <
                  pagination.totalPages && (
                  <>
                    <span>...</span>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handlePageChange(pagination.totalPages)}
                    >
                      {pagination.totalPages}
                    </button>
                  </>
                )}
                <button
                  type="button"
                  disabled={!pagination.hasNext || loading}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </footer>
        </article>

        {selectedEnquiry && (
          <aside className="enquiry-detail-card">
            <header>
              <div>
                <a href={`${BASE_PATH}/admin/dashboard/`}>
                  <ArrowLeft size={16} />
                </a>
                <h2>Enquiry #{selectedEnquiry.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry detail"
              >
                <X size={18} />
              </button>
            </header>

            <section className="enquiry-detail-section">
              <h3>
                <UserRound size={17} />
                Customer Details
              </h3>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>
                    <span>{selectedEnquiry.name}</span>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <span>{selectedEnquiry.phone}</span>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      aria-label="Call customer"
                    >
                      <Phone size={15} />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <span>{selectedEnquiry.email}</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      aria-label="Email customer"
                    >
                      <Mail size={15} />
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="enquiry-detail-section">
              <h3>
                <MessageSquareText size={17} />
                Requirement Details
              </h3>
              <dl>
                <div>
                  <dt>Website Type</dt>
                  <dd>
                    <span>{selectedEnquiry.requirement}</span>
                  </dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>
                    <span>{selectedEnquiry.budget}</span>
                  </dd>
                </div>
                <div>
                  <dt>Start Date</dt>
                  <dd>
                    <span>{selectedEnquiry.startDate}</span>
                  </dd>
                </div>
                <div>
                  <dt>Additional Note</dt>
                  <dd>
                    <span>{selectedEnquiry.note}</span>
                  </dd>
                </div>
                <div>
                  <dt>Email Sent</dt>
                  <dd>
                    <span>{selectedEnquiry.emailSent ? "Yes" : "No"}</span>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="lead-status-section">
              <h3>
                <CircleDot size={17} />
                Lead Status
              </h3>
              <div className="lead-progress">
                {leadSteps.map((step) => (
                  <span
                    key={step}
                    className={
                      leadSteps.indexOf(step) <=
                      leadSteps.indexOf(selectedEnquiry.status)
                        ? "done"
                        : ""
                    }
                  >
                    <i />
                    <small>{step}</small>
                  </span>
                ))}
              </div>
            </section>

            <section className="enquiry-actions">
              <h3>
                <CalendarDays size={17} />
                Actions
              </h3>
              <div>
                <button type="button">
                  <Phone size={15} />
                  Call
                </button>
                <button type="button">
                  <MessageSquareText size={15} />
                  WhatsApp
                </button>
                <button type="button">
                  <Mail size={15} />
                  Email
                </button>
                <button type="button">
                  <ShieldCheck size={15} />
                  Change Status
                </button>
                <button type="button" className="danger">
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </section>

            <section className="enquiry-notes">
              <h3>
                <MessageSquareText size={17} />
                Notes
              </h3>
              <p>No notes added yet.</p>
              <button type="button">+ Add Note</button>
            </section>
          </aside>
        )}
      </section>

      <EmailDialog emailDialog={emailDialog} onClose={handleEmailDialogClose} />
    </AdminShell>
  );
}
