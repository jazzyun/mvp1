'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Deal } from '@/types/deal';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
}

type PaymentMethod = 'bank' | 'paypal' | 'wise';

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentMethod: PaymentMethod;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  paypalEmail: string;
  wiseEmail: string;
  notes: string;
}

export default function InvoiceModal({ isOpen, onClose, deal }: InvoiceModalProps) {
  const t = useTranslations('deals');
  const [step, setStep] = useState<'edit' | 'preview' | 'sent'>('edit');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    paymentMethod: 'bank',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    paypalEmail: '',
    wiseEmail: '',
    notes: '',
  });

  // Generate invoice number and dates on open
  useEffect(() => {
    if (isOpen && deal) {
      const now = new Date();
      const invoiceNum = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const issueDate = now.toISOString().split('T')[0];
      const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      setInvoiceData(prev => ({
        ...prev,
        invoiceNumber: invoiceNum,
        issueDate,
        dueDate,
      }));
      setStep('edit');
    }
  }, [isOpen, deal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen || !deal) return null;

  const handleSend = () => {
    setStep('sent');
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'TBD';
    return `$${amount.toLocaleString()}`;
  };

  const renderEditStep = () => (
    <div className="space-y-5">
      {/* Invoice Header Preview */}
      <div className="bg-gradient-to-r from-[#00A699] to-[#00B4A3] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm opacity-80">Invoice</p>
            <p className="text-lg font-bold truncate">{invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold">{formatCurrency(deal.offeredAmount)}</p>
            <p className="text-sm opacity-80">Total Amount</p>
          </div>
        </div>
      </div>

      {/* Deal Info */}
      <div className="bg-[#F7F7F7] rounded-xl p-4">
        <div className="flex items-center gap-3">
          {deal.brandProfile?.logo && (
            <span className="text-2xl flex-shrink-0">{deal.brandProfile.logo}</span>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-[#222222] truncate">{deal.brandName}</p>
            <p className="text-sm text-[#717171] truncate">{deal.offeredDetails}</p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#222222] mb-2">Issue Date</label>
          <input
            type="date"
            value={invoiceData.issueDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#222222] mb-2">Due Date</label>
          <input
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {(['bank', 'paypal', 'wise'] as PaymentMethod[]).map((method) => (
            <button
              key={method}
              onClick={() => setInvoiceData({ ...invoiceData, paymentMethod: method })}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                invoiceData.paymentMethod === method
                  ? 'border-[#00A699] bg-[#00A699]/5'
                  : 'border-[#DDDDDD] hover:border-[#B0B0B0]'
              }`}
            >
              {method === 'bank' && (
                <svg className="w-6 h-6 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                </svg>
              )}
              {method === 'paypal' && (
                <svg className="w-6 h-6 text-[#003087]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.217a.773.773 0 0 1 .763-.645h6.852c2.33 0 4.076.572 5.17 1.699 1.048 1.078 1.373 2.543 1.025 4.467-.024.132-.05.265-.079.398-.728 3.698-3.183 5.527-7.307 5.527H8.727a.642.642 0 0 0-.633.545l-.983 6.082a.641.641 0 0 1-.633.545l-.402.002z"/>
                </svg>
              )}
              {method === 'wise' && (
                <svg className="w-6 h-6 text-[#00B9FF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
              <span className="text-xs font-medium capitalize">{method}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Details based on method */}
      {invoiceData.paymentMethod === 'bank' && (
        <div className="space-y-4 p-4 bg-[#F7F7F7] rounded-xl">
          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">Bank Name</label>
            <input
              type="text"
              value={invoiceData.bankName}
              onChange={(e) => setInvoiceData({ ...invoiceData, bankName: e.target.value })}
              placeholder="e.g., Chase Bank"
              className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Account Number</label>
              <input
                type="text"
                value={invoiceData.accountNumber}
                onChange={(e) => setInvoiceData({ ...invoiceData, accountNumber: e.target.value })}
                placeholder="••••••1234"
                className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Routing Number</label>
              <input
                type="text"
                value={invoiceData.routingNumber}
                onChange={(e) => setInvoiceData({ ...invoiceData, routingNumber: e.target.value })}
                placeholder="021000021"
                className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {invoiceData.paymentMethod === 'paypal' && (
        <div className="p-4 bg-[#F7F7F7] rounded-xl">
          <label className="block text-sm font-medium text-[#222222] mb-2">PayPal Email</label>
          <input
            type="email"
            value={invoiceData.paypalEmail}
            onChange={(e) => setInvoiceData({ ...invoiceData, paypalEmail: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none bg-white"
          />
        </div>
      )}

      {invoiceData.paymentMethod === 'wise' && (
        <div className="p-4 bg-[#F7F7F7] rounded-xl">
          <label className="block text-sm font-medium text-[#222222] mb-2">Wise Email</label>
          <input
            type="email"
            value={invoiceData.wiseEmail}
            onChange={(e) => setInvoiceData({ ...invoiceData, wiseEmail: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none bg-white"
          />
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">Notes (Optional)</label>
        <textarea
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
          placeholder="Thank you for the collaboration!"
          rows={3}
          className="w-full px-4 py-3 border border-[#DDDDDD] rounded-lg focus:border-[#00A699] focus:ring-1 focus:ring-[#00A699] outline-none resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setStep('preview')}
          className="flex-1 py-3 bg-[#00A699] text-white rounded-xl font-semibold hover:bg-[#008F84] transition-colors"
        >
          Preview Invoice
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-4">
      {/* Invoice Document */}
      <div className="bg-white border border-[#DDDDDD] rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A699] to-[#00B4A3] p-5 text-white">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-bold">INVOICE</h3>
              <p className="text-sm opacity-80 mt-1 truncate">{invoiceData.invoiceNumber}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs opacity-80">Amount Due</p>
              <p className="text-2xl font-bold">{formatCurrency(deal.offeredAmount)}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* From / To */}
          <div className="grid grid-cols-2 gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-1">From</p>
              <p className="font-semibold text-[#222222] text-sm">Hanna</p>
              <p className="text-xs text-[#717171]">Content Creator</p>
              <p className="text-xs text-[#717171] truncate">hello@hanna.com</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-1">To</p>
              <p className="font-semibold text-[#222222] text-sm truncate">{deal.brandName}</p>
              {deal.brandProfile?.industry && (
                <p className="text-xs text-[#717171] truncate">{deal.brandProfile.industry}</p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#EBEBEB]">
            <div>
              <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-1">Issue Date</p>
              <p className="text-sm text-[#222222]">{new Date(invoiceData.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-1">Due Date</p>
              <p className="text-sm text-[#222222]">{new Date(invoiceData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-2">Services</p>
            <div className="bg-[#F7F7F7] rounded-lg p-3">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#222222] text-sm truncate">{deal.offeredDetails}</p>
                  <p className="text-xs text-[#717171]">Content creation & usage rights</p>
                </div>
                <p className="font-semibold text-[#222222] text-sm flex-shrink-0">{formatCurrency(deal.offeredAmount)}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-2">Payment Details</p>
            <div className="bg-[#F7F7F7] rounded-lg p-3 space-y-1">
              {invoiceData.paymentMethod === 'bank' && (
                <>
                  <p className="text-xs"><span className="text-[#717171]">Bank:</span> <span className="text-[#222222]">{invoiceData.bankName || 'Not specified'}</span></p>
                  <p className="text-xs"><span className="text-[#717171]">Account:</span> <span className="text-[#222222]">{invoiceData.accountNumber || '••••••••'}</span></p>
                  <p className="text-xs"><span className="text-[#717171]">Routing:</span> <span className="text-[#222222]">{invoiceData.routingNumber || '•••••••••'}</span></p>
                </>
              )}
              {invoiceData.paymentMethod === 'paypal' && (
                <p className="text-xs"><span className="text-[#717171]">PayPal:</span> <span className="text-[#222222]">{invoiceData.paypalEmail || 'Not specified'}</span></p>
              )}
              {invoiceData.paymentMethod === 'wise' && (
                <p className="text-xs"><span className="text-[#717171]">Wise:</span> <span className="text-[#222222]">{invoiceData.wiseEmail || 'Not specified'}</span></p>
              )}
            </div>
          </div>

          {/* Notes */}
          {invoiceData.notes && (
            <div>
              <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-1">Notes</p>
              <p className="text-xs text-[#717171] italic">{invoiceData.notes}</p>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-[#EBEBEB]">
            <p className="text-base font-semibold text-[#222222]">Total</p>
            <p className="text-xl font-bold text-[#00A699]">{formatCurrency(deal.offeredAmount)}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setStep('edit')}
          className="flex-1 py-3 bg-white border border-[#222222] text-[#222222] rounded-xl font-semibold hover:bg-[#F7F7F7] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleSend}
          className="flex-1 py-3 bg-[#00A699] text-white rounded-xl font-semibold hover:bg-[#008F84] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Invoice
        </button>
      </div>
    </div>
  );

  const renderSentStep = () => (
    <div className="text-center py-6 space-y-5">
      {/* Success Animation */}
      <div className="w-20 h-20 mx-auto bg-[#00A699]/10 rounded-full flex items-center justify-center">
        <div className="w-14 h-14 bg-[#00A699] rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#222222] mb-1">Invoice Sent!</h3>
        <p className="text-sm text-[#717171]">Your invoice has been sent to {deal.brandName}</p>
      </div>

      {/* Invoice Summary */}
      <div className="bg-[#F7F7F7] rounded-xl p-4 text-left">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#717171]">Invoice Number</span>
          <span className="text-sm font-medium text-[#222222] truncate ml-2">{invoiceData.invoiceNumber}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#717171]">Amount</span>
          <span className="text-sm font-bold text-[#00A699]">{formatCurrency(deal.offeredAmount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#717171]">Due Date</span>
          <span className="text-sm font-medium text-[#222222]">{new Date(invoiceData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            // Download PDF functionality could be added here
          }}
          className="flex-1 py-3 bg-white border border-[#222222] text-[#222222] rounded-xl font-semibold text-sm hover:bg-[#F7F7F7] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 bg-[#00A699] text-white rounded-xl font-semibold text-sm hover:bg-[#008F84] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 sm:mx-auto bg-white rounded-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00A699]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#00A699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-[#222222]">
                {step === 'edit' && 'Create Invoice'}
                {step === 'preview' && 'Preview Invoice'}
                {step === 'sent' && 'Invoice Sent'}
              </h2>
              <p className="text-sm text-[#717171] truncate">{deal.brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F7F7] transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'edit' && renderEditStep()}
          {step === 'preview' && renderPreviewStep()}
          {step === 'sent' && renderSentStep()}
        </div>
      </div>
    </div>
  );
}
