import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { toast } from 'react-hot-toast';
import {
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDownload,
  FiCreditCard,
  FiAlertCircle,
  FiFileText,
  FiUser,
  FiUsers
} from 'react-icons/fi';

const ParentFees = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [children] = useState([
    { id: 1, name: 'John Doe', className: '10-A', rollNo: 'STU-2024-001' },
    { id: 2, name: 'Jane Doe', className: '8-B', rollNo: 'STU-2024-150' }
  ]);

  const [feeStructure] = useState({
    tuitionFee: 5000,
    labFee: 500,
    libraryFee: 300,
    sportsFee: 400,
    examFee: 600,
    developmentFee: 700,
    total: 7500
  });

  const [feeRecords] = useState([
    // John Doe's fees
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      className: '10-A',
      term: 'First Term 2024-2025',
      dueDate: '2024-09-15',
      amount: 7500,
      paidAmount: 7500,
      status: 'paid',
      paymentDate: '2024-09-10',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-001',
      receiptNo: 'RCP-2024-001'
    },
    {
      id: 2,
      childId: 1,
      childName: 'John Doe',
      className: '10-A',
      term: 'Second Term 2024-2025',
      dueDate: '2024-12-15',
      amount: 7500,
      paidAmount: 7500,
      status: 'paid',
      paymentDate: '2024-12-10',
      paymentMethod: 'Online Banking',
      transactionId: 'TXN-2024-002',
      receiptNo: 'RCP-2024-002'
    },
    {
      id: 3,
      childId: 1,
      childName: 'John Doe',
      className: '10-A',
      term: 'Third Term 2024-2025',
      dueDate: '2025-03-15',
      amount: 7500,
      paidAmount: 5000,
      status: 'partial',
      paymentDate: '2025-01-10',
      paymentMethod: 'Cash',
      transactionId: 'TXN-2025-001',
      receiptNo: 'RCP-2025-001',
      pendingAmount: 2500
    },
    {
      id: 4,
      childId: 1,
      childName: 'John Doe',
      className: '10-A',
      term: 'Fourth Term 2024-2025',
      dueDate: '2025-06-15',
      amount: 7500,
      paidAmount: 0,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      receiptNo: null,
      pendingAmount: 7500
    },
    // Jane Doe's fees
    {
      id: 5,
      childId: 2,
      childName: 'Jane Doe',
      className: '8-B',
      term: 'First Term 2024-2025',
      dueDate: '2024-09-15',
      amount: 7500,
      paidAmount: 7500,
      status: 'paid',
      paymentDate: '2024-09-08',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-005',
      receiptNo: 'RCP-2024-005'
    },
    {
      id: 6,
      childId: 2,
      childName: 'Jane Doe',
      className: '8-B',
      term: 'Second Term 2024-2025',
      dueDate: '2024-12-15',
      amount: 7500,
      paidAmount: 7500,
      status: 'paid',
      paymentDate: '2024-12-08',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-006',
      receiptNo: 'RCP-2024-006'
    },
    {
      id: 7,
      childId: 2,
      childName: 'Jane Doe',
      className: '8-B',
      term: 'Third Term 2024-2025',
      dueDate: '2025-03-15',
      amount: 7500,
      paidAmount: 7500,
      status: 'paid',
      paymentDate: '2025-03-01',
      paymentMethod: 'Online Banking',
      transactionId: 'TXN-2025-005',
      receiptNo: 'RCP-2025-005'
    },
    {
      id: 8,
      childId: 2,
      childName: 'Jane Doe',
      className: '8-B',
      term: 'Fourth Term 2024-2025',
      dueDate: '2025-06-15',
      amount: 7500,
      paidAmount: 0,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      receiptNo: null,
      pendingAmount: 7500
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'partial':
        return 'warning';
      case 'pending':
        return 'danger';
      case 'overdue':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'partial':
        return <FiClock className="w-5 h-5" />;
      case 'pending':
        return <FiXCircle className="w-5 h-5" />;
      case 'overdue':
        return <FiAlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePayNow = (fee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const handleViewReceipt = (fee) => {
    setSelectedReceipt(fee);
    setShowReceiptModal(true);
  };

  const handleMakePayment = () => {
    toast.success('Payment processed successfully!');
    setShowPaymentModal(false);
    setSelectedFee(null);
  };

  // Filter fee records based on selected child
  const filteredFeeRecords = selectedChild === 'all'
    ? feeRecords
    : feeRecords.filter(record => record.childId === parseInt(selectedChild));

  const totalPaid = filteredFeeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = filteredFeeRecords.reduce((sum, record) => sum + (record.pendingAmount || 0), 0);
  const totalFees = filteredFeeRecords.reduce((sum, record) => sum + record.amount, 0);

  // Get all paid records for payment history
  const paymentHistory = feeRecords.filter(record => record.paidAmount > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600 mt-1">View and manage your children's fee payments</p>
        </div>

        {/* Child Selector */}
        <Card>
          <div className="flex items-center gap-4 flex-wrap">
            <FiUser className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">View fees for:</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedChild === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedChild('all')}
              >
                <FiUsers className="mr-2 w-4 h-4" />
                All Children
              </Button>
              {children.map(child => (
                <Button
                  key={child.id}
                  variant={selectedChild === child.id.toString() ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedChild(child.id.toString())}
                >
                  {child.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Fee Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <FiDollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Fees</p>
              <p className="text-2xl font-bold text-blue-600">${totalFees}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiClock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">${totalPending}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiFileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Receipts</p>
              <p className="text-2xl font-bold text-purple-600">{paymentHistory.length}</p>
            </div>
          </Card>
        </div>

        {/* Outstanding Balance Warning */}
        {totalPending > 0 && (
          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg flex items-start gap-3">
            <FiAlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-orange-900">Outstanding Balance</h4>
              <p className="text-sm text-orange-800 mt-1">
                You have a pending balance of ${totalPending}. Please clear your dues to avoid late fees.
              </p>
            </div>
          </div>
        )}

        {/* Fee Structure */}
        <Card title="Fee Structure (Per Term)">
          <div className="space-y-3">
            {Object.entries(feeStructure).map(([key, value], index) => {
              if (key === 'total') return null;
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900 font-medium">{label}</span>
                  <span className="text-blue-600 font-bold">${value}</span>
                </div>
              );
            })}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <span className="text-gray-900 font-bold text-lg">Total Per Term</span>
              <span className="text-blue-600 font-bold text-2xl">${feeStructure.total}</span>
            </div>
          </div>
        </Card>

        {/* Fee Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Fee Records</h2>
          {filteredFeeRecords.map((record) => {
            const daysRemaining = getDaysRemaining(record.dueDate);
            const isOverdue = daysRemaining < 0 && record.status !== 'paid';

            return (
              <Card key={record.id} hoverable>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        record.status === 'paid' ? 'bg-green-100' :
                        record.status === 'partial' ? 'bg-orange-100' :
                        'bg-red-100'
                      }`}>
                        {getStatusIcon(record.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{record.term}</h3>
                          {selectedChild === 'all' && (
                            <Badge variant="info" size="sm">{record.childName}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{record.className}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant={getStatusColor(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                          {isOverdue && <Badge variant="danger">Overdue</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${record.amount}</p>
                      <p className="text-sm text-gray-600">Total Fee</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>Due Date</span>
                      </div>
                      <p className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                        {record.dueDate}
                      </p>
                      {record.status !== 'paid' && !isOverdue && (
                        <p className="text-xs text-gray-600 mt-1">
                          {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Due today'}
                        </p>
                      )}
                      {isOverdue && (
                        <p className="text-xs text-red-600 mt-1">
                          Overdue by {Math.abs(daysRemaining)} days
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiDollarSign className="w-4 h-4" />
                        <span>Paid Amount</span>
                      </div>
                      <p className="font-medium text-green-600">${record.paidAmount}</p>
                    </div>
                    {record.pendingAmount > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <FiClock className="w-4 h-4" />
                          <span>Pending Amount</span>
                        </div>
                        <p className="font-medium text-orange-600">${record.pendingAmount}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Details */}
                  {record.paymentDate && (
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-900">
                            Payment of ${record.paidAmount} received on {record.paymentDate}
                          </p>
                          <p className="text-xs text-green-800 mt-1">
                            Method: {record.paymentMethod} • Transaction ID: {record.transactionId}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {record.status === 'paid' && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleViewReceipt(record)}
                        >
                          <FiFileText className="mr-2 w-4 h-4" />
                          View Receipt
                        </Button>
                        <Button variant="outline" size="sm">
                          <FiDownload className="mr-2 w-4 h-4" />
                          Download Receipt
                        </Button>
                      </>
                    )}
                    {(record.status === 'pending' || record.status === 'partial') && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePayNow(record)}
                      >
                        <FiCreditCard className="mr-2 w-4 h-4" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Payment History */}
        <Card title="Payment History">
          <div className="space-y-2">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{payment.term}</p>
                      <Badge variant="info" size="sm">{payment.childName}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {payment.paymentDate} • {payment.paymentMethod}
                    </p>
                    <p className="text-xs text-gray-500">Transaction ID: {payment.transactionId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">${payment.paidAmount}</p>
                  <Badge variant="success" size="sm">Success</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedFee(null);
        }}
        title="Make Payment"
        size="lg"
      >
        {selectedFee && (
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{selectedFee.term}</h3>
                <Badge variant="info" size="sm">{selectedFee.childName}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-bold text-gray-900">${selectedFee.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount Due</p>
                  <p className="font-bold text-orange-600">
                    ${selectedFee.pendingAmount || selectedFee.amount}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="space-y-3">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-3">
                    <FiCreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'bank'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center gap-3">
                    <FiDollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Online Banking</p>
                      <p className="text-sm text-gray-600">Pay via internet banking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm font-medium text-yellow-900">Important:</p>
              <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                <li>• Payment will be processed immediately</li>
                <li>• You will receive a receipt via email</li>
                <li>• Transaction may take 2-3 business days to reflect</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedFee(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleMakePayment}>
                <FiCreditCard className="mr-2 w-4 h-4" />
                Pay ${selectedFee.pendingAmount || selectedFee.amount}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          setSelectedReceipt(null);
        }}
        title="Payment Receipt"
        size="lg"
      >
        {selectedReceipt && (
          <div className="space-y-6">
            {/* Receipt Header */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Payment Successful</h3>
              <p className="text-gray-600 mt-1">Receipt No: {selectedReceipt.receiptNo}</p>
              <Badge variant="info" className="mt-2">{selectedReceipt.childName}</Badge>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Term</p>
                  <p className="font-medium text-gray-900">{selectedReceipt.term}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="font-bold text-green-600 text-lg">${selectedReceipt.paidAmount}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Payment Date</p>
                  <p className="font-medium text-gray-900">{selectedReceipt.paymentDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900">{selectedReceipt.paymentMethod}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-gray-900">{selectedReceipt.transactionId}</p>
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Fee Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(feeStructure).map(([key, value], index) => {
                  if (key === 'total') return null;
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{label}</span>
                      <span className="text-gray-900 font-medium">${value}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded border-2 border-blue-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-blue-600 text-lg">${feeStructure.total}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <FiDownload className="mr-2 w-4 h-4" />
                Download Receipt
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowReceiptModal(false);
                  setSelectedReceipt(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ParentFees;
