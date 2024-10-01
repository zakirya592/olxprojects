import React, { useEffect, useState } from 'react'

const TermsAndCondition = ({ isVisible, setVisibility, handleClose, handleAccept }) => {

    return (
      <div>
        {/* create the post api popup */}
        {isVisible && (
          <div className="popup-overlay z-50">
            <div className="popup-container h-auto sm:w-[40%] bg-white w-full">
              <div className="popup-form w-full">
                <div className="flex justify-end w-full">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form className="w-full">
                  <div className="mb-2">
                    <p className="text-lg sm:text-3xl font-body text-secondary text-center font-normal">
                      Terms & Conditions
                    </p>
                  </div>
                  <hr />

                  <div className="mt-3 max-h-64 overflow-y-auto">
                    <p className="text-secondary font-body">
                      Terms and Conditions for Sellers on Pakardi.com
                    </p>

                    <p className="text-secondary font-body mt-6">
                      Welcome to Pakardi.com. These Terms and Conditions
                      ("Agreement") govern your use of our website as a seller.
                      By registering as a seller on Pakardi.com, you agree to
                      the following terms and conditions. Please read this
                      agreement carefully. If you do not agree to these terms,
                      you may not register as a seller or use our services.
                    </p>

                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>1. Seller Registration</li>
                      <li className="ms-3">
                        1.1 Eligibility: You must provide accurate, current, and
                        complete information during the registration process and
                        update such information to keep it accurate and current.
                      </li>
                      <li className="ms-3">
                        1.2 Verification: Pakardi.com reserves the right to
                        verify the identity of all sellers. Any false or
                        misleading information provided during registration may
                        lead to the termination of your account.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>2. Seller Responsibilities</li>
                      <li className="ms-3">
                        2.1 Accuracy of Listings: As a seller, you agree to
                        provide accurate descriptions, images, and details of
                        the products you list for sale on Pakardi.com.
                        Misrepresentation of any kind, including using
                        inaccurate pictures or descriptions, is strictly
                        prohibited.
                      </li>
                      <li className="ms-3">
                        2.2 Prohibited Items: You are not allowed to sell
                        illegal, fraudulent, counterfeit, or prohibited items as
                        per local laws and regulations.
                      </li>
                      <li className="ms-3">
                        2.3 Communication with Buyers: All communication with
                        buyers must be honest, respectful, and professional.
                        Sellers must adhere to all applicable consumer
                        protection laws.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>3. Fraud Prevention</li>
                      <li className="ms-3">
                        3.1 Prohibited Conduct: Any form of fraudulent activity,
                        including but not limited to the following, will result
                        in immediate termination of your account and legal
                        action: Listing counterfeit or stolen products Providing
                        false or misleading information about products Uploading
                        fraudulent or unauthorized images Engaging in deceptive
                        pricing practices
                      </li>
                      <li className="ms-3">
                        3.2 Legal Action: In case of fraud or suspicious
                        activity, Pakardi.com reserves the right to provide your
                        information (including name, address, email, IP address,
                        and transaction history) to law enforcement authorities
                        or other relevant legal entities for investigation.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>4. Termination of Account</li>
                      <li className="ms-3">
                        4.1 Account Suspension: Pakardi.com reserves the right
                        to suspend or terminate your account without prior
                        notice if you violate these terms or engage in
                        fraudulent activities. Upon suspension or termination,
                        you will lose access to all services and listings on
                        Pakardi.com.
                      </li>
                      <li className="ms-3">
                        4.2 Finality: Decisions regarding account termination
                        are final, and reinstatement will not be considered if
                        fraud or misconduct is found.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>5. Liability</li>
                      <li className="ms-3">
                        5.1 Indemnification: You agree to indemnify and hold
                        Pakardi.com harmless from any claims, liabilities,
                        losses, or damages arising from your violation of these
                        terms or any fraudulent activities conducted through
                        your account.
                      </li>
                      <li className="ms-3">
                        5.2 Limitation of Liability: Pakardi.com is not
                        responsible for any damages or losses incurred by you or
                        any third party as a result of fraudulent activity on
                        your part. You are solely responsible for ensuring the
                        accuracy and legality of the products you sell.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>6. Legal Compliance</li>
                      <li className="ms-3">
                        6.1 Jurisdiction: You agree to comply with all
                        applicable laws, regulations, and ordinances related to
                        your selling activities on Pakardi.com.
                      </li>
                      <li className="ms-3">
                        6.2 Legal Proceedings: Pakardi.com reserves the right to
                        cooperate fully with legal investigations and
                        proceedings. Your personal information may be shared
                        with authorities if fraud or illegal activity is
                        suspected.
                      </li>
                    </ul>
                    <ul className="list-none text-secondary font-body  ml-8 mt-3">
                      <li>7. Changes to the Terms and Conditions</li>
                      <li className="ms-3">
                        Pakardi.com reserves the right to update or modify these
                        Terms and Conditions at any time without prior notice.
                        Sellers will be notified of any significant changes, and
                        continued use of the website will constitute acceptance
                        of the revised terms.
                      </li>
                      <li className="ms-3">
                        By registering as a seller on Pakardi.com, you
                        acknowledge that you have read, understood, and agreed
                        to these Terms and Conditions.
                      </li>
                    </ul>
                  </div>
                  <hr className="mt-2" />

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="bg-[#c82333] hover:bg-red-700 text-white px-3 py-1.5 rounded mr-2"
                      onClick={handleAccept}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-[#ffc107] hover:bg-[#e0a800] px-3 py-1.5 rounded"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default TermsAndCondition