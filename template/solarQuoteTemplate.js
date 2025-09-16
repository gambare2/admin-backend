const path = require("path");
// const API_URL = process.env.VITE_API_URL;
const API_URL = "http://localhost:5000";



module.exports = function generateSolarQuoteHTML(proposal) {
  // inside generateSolarQuoteHTML(proposal)

  const productRows = proposal.products?.map(p => {
    const qty = p.qty || 1;
    const amount = qty * (p.price || 0);
    return `
    <tr>
      <td class="border p-2">${p.name}</td>
      <td class="border p-2 text-right">₹${p.price?.toLocaleString() || 0}</td>
      <td class="border p-2 text-right">${qty}</td>
      <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
    </tr>
  `;
  }).join("") || "";

  // services may not have qty, so default to 1
  const serviceRows = proposal.services?.map(s => {
    const qty = s.qty || 1;
    const amount = qty * (s.price || 0);
    return `
    <tr>
      <td class="border p-2">${s.name}</td>
      <td class="border p-2 text-right">₹${s.price?.toLocaleString() || 0}</td>
      <td class="border p-2 text-right">${qty}</td>
      <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
    </tr>
  `;
  }).join("") || "";

  // calculate totals
  const subtotal =
    (proposal.products?.reduce((sum, p) => sum + (p.qty || 1) * (p.price || 0), 0) || 0) +
    (proposal.services?.reduce((sum, s) => sum + (s.qty || 1) * (s.price || 0), 0) || 0);

  const gstPercent = 12;
  const gstAmount = (subtotal * gstPercent) / 100;
  const totalCost = subtotal + gstAmount;

  const subsidy = proposal.costs?.subsidy || 0;
  const netPayable = totalCost - subsidy;

  const amountInWords = proposal.costs?.amountInWords || "";

  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Proposal - ${proposal.clientName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @page { size: A4; margin: 20mm; }
    </style>
  </head>
  <body class="font-sans text-gray-800 text-[12px] leading-relaxed">
    <div class="max-w-[800px] mx-auto">

      <!-- Header -->
      <header class="flex justify-between items-start mb-6">
        <img src="${API_URL}/assets/logo.png" class="h-16" />
        <div class="text-right text-[11px]">
          <strong class="text-[14px] block">SUNMAYO PRIVATE LIMITED</strong>
         Shop No. 02 Opposite M3M Urbana Premium,<br/> 
         Old Kadarpur Road, Sector 64,<br/>
          Badshahpur, Gurgaon, Haryana 122101<br/>
          Contact: +91 9643800850<br/>
          Mail us at: info@sunmayo.com<br/>
          www.sunmayo.com
        </div>
      </header>

      <h1 class="text-center text-2xl font-bold text-[#0a4b78] border-b pb-2">SOLAR PROPOSAL</h1>
      <!-- Prepared Section -->
      <section class="bg-gray-100 p-3 rounded-md mt-3">
        <div class="flex justify-between gap-5">
          <div>
            <h2 class="font-bold text-3xl">Prepared For:</h2>
            ${proposal.clientName}<br/>
            ${proposal.clientPhone || ""}<br/>
            ${proposal.clientEmail || ""}<br/>
            ${proposal.clientAddress || ""}
          </div>
          <div class="text-right">
            <h2 class="font-bold text-3xl">Prepared By:</h2>
            SUNMAYO PRIVATE LIMITED<br/>
            26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001
          </div>
        </div>
      </section>
      <section class= "flex flex-col">
       <img class="w-full my-4" src="${API_URL}/assets/Panel_logo.png" />
        <img class="w-full my-4" src="${API_URL}/assets/solar-panel.jpg" />
      </section>

      <!-- Project -->
      <section class="mt-6">
        <h2 class="text-lg font-semibold text-[#0a4b78]"></h2>
        <p></p>
        <p><strong></strong></p>
      </section>
<div class="max-w-2xl w-full bg-white p-8 rounded-md shadow">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-[#0a4b78]">Welcome</h1>
    <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>

  <!-- Name -->
  <div class="mb-10">
    <h2 class="text-2xl font-semibold mb-2">${proposal.clientName}</h2>
    <div class="h-1 w-10 bg-[#0a4b78] mb-6"></div>

    <!-- Letter Content -->
    <p class="mb-4 text-lg">
      Dear <strong>${proposal.clientName}</strong>
    </p>
    <p class="mb-4 text-xl">
      It has been a privilege to understand your requirement and give you the
      best solution for you. As required, we have committed to the highest
      level of quality. That’s why we select the best components and
      industry-leading performance models to ensure your system will produce
      optimally.
    </p>
    <p class="mb-4 text-xl">
      Our highly trained installation crews take pride in delivering beautiful
      well-made solar arrays. From the panels to the bolts on the roof, we’ll
      deliberately consider every piece of your installation so you can rest
      easy throughout its many years of service. We take great pride in our
      guarantee of complete customer satisfaction.
    </p>
    <p class="mb-4 text-xl">
      We are looking forward to help you and have a long-term relationship
      with you. Please go through the proposal and give us your feedback.
    </p>
  </div>

  <!-- Footer -->
  <div class="mt-8 text-lg">
    <p class="font-bold">Thanks & Regards,</p>
    <p class="font-medium">SunMayo Private Limited</p>
    <p class="text-lg">+91 9971490782</p>
    <p class="uppercase font-semibold">SUNMAYO PRIVATE LIMITED</p>
  </div>
</div>

<!-- Force new page in PDF -->
<div style="page-break-before: always;"></div>

<div class="max-w-2xl w-full bg-white p-8">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-[#0a4b78]">About Us</h1>
    <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>

  <!-- Letter Content -->
  <p class="mb-4 text-lg">
    At SUNMAYO PRIVATE LIMITED, we are committed to empowering homes
    and businesses with clean, reliable, and affordable solar energy. As a
    trusted solar installer, we specialize in designing and delivering
    customized solar solutions that meet the unique energy needs of our
    customers.
  </p>
  <p class="mb-4 text-lg">
    With years of industry experience and a passion for sustainability, our team
    of certified professionals ensures every installation is completed with
    precision, efficiency, and care. From initial consultation to post-installation
    support, we guide our clients every step of the way to make the transition
    to solar seamless and rewarding.
  </p>
  <p class="mb-4 text-lg">
    Our mission is simple: to help build a greener future while reducing energy
    costs and increasing energy independence for our customers. Backed by
    the latest technology, quality materials, and a customer-first approach, we
    aim to be your long-term energy partner
  </p>
  <p class="mb-4 text-lg">
    Let’s power a brighter tomorrow together.
  </p>

  <p class="font-bold text-xl">Why Choose SUNMAYO PRIVATE LIMITED ?</p>
  <ul class="text-lg list-disc pl-6">
    <li>Expert Solar Specialists</li>
    <li>Customized Solutions</li>
    <li>Proven Success</li>
    <li>Customer-Centric Approach</li>
    <li>Cost-Effective Solutions</li>
  </ul>

  <!-- Footer -->
  <div class="mt-8 text-lg">
    <p class="font-bold">Thanks & Regards,</p>
    <p class="font-medium">SunMayo Private Limited</p>
    <p class="text-lg">+91 9643800850</p>
    <p class="uppercase font-semibold">SUNMAYO PRIVATE LIMITED</p>
  </div>
</div>

<!-- Project Details -->
<div style="page-break-before: always;"></div>
   <div class="max-w-3xl w-full bg-white p-10 text-lg ">
 <!-- Header -->
<div class="flex justify-between items-center mb-6">
  <div>
    <h1 class="text-3xl font-bold text-[#0a4b78]">
      ${proposal.products?.[0]?.specification || 0}KW
    </h1>
    <p class="text-gray-600 text-xl">Specification</p>
  </div>
  <img src="${API_URL}/assets/logo.png" class="h-16" />
</div>

<!-- Specification Grid -->
<div class="grid grid-cols-3 gap-6 mb-8">
  <div>
    <p class="text-gray-600">Plant Capacity:</p>
    <p class="font-bold text-[#0a4b78]">
      ${proposal.products?.reduce((sum, p) => sum + (p.specification || 0), 0)}KW
    </p>
  </div>
  <div>
    <p class="text-gray-600">Structure Type:</p>
    <p class="font-bold text-[#0a4b78]">${proposal.structureType || "Elevated"}</p>
  </div>
  <div>
    <p class="text-gray-600">Project Details:</p>
    <p class="font-bold text-[#0a4b78]">${proposal.name || "Project Name"}</p>
  </div>
</div>


  <!-- Map + Design Preview -->
  <div class="grid grid-cols-2 gap-6 mb-10">
    <div>
      <img src="${API_URL}/assets/location.png" alt="Map" class="rounded-md shadow" />
    </div>
    <div class="flex items-center justify-center border border-dashed rounded-md bg-gray-50 text-center p-6">
      <div>
        <p class="text-xl font-semibold text-[#0a4b78]">Design Preview Unavailable</p>
        <p class="text-gray-500 text-sm mt-2">
          Your design hasn’t been saved yet.<br />
          Please save your progress to preview it here.
        </p>
      </div>
    </div>
  </div>

  <!-- Project + 3D Design -->
  <div class="grid grid-cols-2 gap-6">
    <div>
      <h2 class="text-lg font-semibold text-[#0a4b78]">Project Location</h2>
      <p class="text-gray-700 mt-2">
        ${proposal.projectDetails || "Your solar project is located at the specified address."}
      </p>
      <p class="mt-2"><strong>Budget:</strong> ₹${proposal.budget || 0}</p>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#0a4b78]">3D Design</h2>
      <p class="text-gray-700 mt-2">
        View how the 550 Wp Premier Energies / Renew Power panels will be installed on your roof for maximum efficiency.
      </p>
    </div>
  </div>
</div>

<div style="page-break-before: always;"></div>


<!-- Commercial Offer -->
<img src="${API_URL}/assets/logo.png" class="h-16" />
<section class="mt-6">
  <h2 class="text-2xl font-bold text-[#0a4b78]">Commercial</h2>
  <p class="text-xl font-medium">Offer</p>
  <div class="w-12 h-[2px] bg-[#0a4b78] mt-1 mb-4"></div>

  <p class="text-sm mb-4">
    Price Quote & Payment schedule for <strong>${proposal.plantCapacity || "5 KW"} Grid Tie Rooftop Solar System:</strong>
  </p>

 <!-- Table -->
  <table class="w-full border-collapse mt-4 text-sm">
    <thead class="bg-gray-100">
      <tr>
        <th class="border p-2 text-left">Item</th>
        <th class="border p-2 text-right">Price</th>
        <th class="border p-2 text-right">Qty</th>
        <th class="border p-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <!-- Products -->
      ${proposal.products?.map(p => {
    const qty = p.qty || 1;
    const amount = qty * (p.price || 0);
    return `
          <tr>
            <td class="border p-2">${p.name}</td>
            <td class="border p-2 text-right">₹${p.price?.toLocaleString() || 0}</td>
            <td class="border p-2 text-right">${qty}</td>
            <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
          </tr>
        `;
  }).join("") || ""}

      <!-- Services -->
      ${proposal.services?.map(s => {
    const qty = s.qty || 1;
    const amount = qty * (s.price || 0);
    return `
          <tr>
            <td class="border p-2">${s.name}</td>
            <td class="border p-2 text-right">₹${s.price?.toLocaleString() || 0}</td>
            <td class="border p-2 text-right">${qty}</td>
            <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
          </tr>
        `;
  }).join("") || ""}

      <!-- Totals -->
      <tr>
        <td colspan="3" class="border p-2 font-medium">Subtotal</td>
        <td class="border p-2 text-right">₹${subtotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td colspan="3" class="border p-2 font-medium">Tax GST (${gstPercent}%)</td>
        <td class="border p-2 text-right">₹${gstAmount.toLocaleString()}</td>
      </tr>
      <tr class="font-semibold">
        <td colspan="3" class="border p-2">Total Cost</td>
        <td class="border p-2 text-right">₹${totalCost.toLocaleString()}</td>
      </tr>
      <tr>
        <td colspan="3" class="border p-2">Subsidy</td>
        <td class="border p-2 text-right text-red-600">- ₹${subsidy.toLocaleString()}</td>
      </tr>
      <tr class="bg-[#0a4b78] text-white font-bold">
        <td colspan="3" class="border p-2">Total</td>
        <td class="border p-2 text-right">₹${netPayable.toLocaleString()}</td>
      </tr>
    </tbody>
  </table>

  <!-- Amount in words -->
  <div class="mt-2 text-sm font-medium">
    Amount in Words: ${amountInWords}
  </div>

  <!-- Payment Schedule -->
  <section class="mt-6">
    <h3 class="text-lg font-semibold text-[#0a4b78]">Payment Schedule:</h3>
    <p class="text-sm leading-relaxed">
      As a percentage of the Net Value of System:
      ${proposal.paymentSchedule?.map(p => `${p.percent}% — ${p.stage}`).join(", ") ||
    "30% advance along with Purchase Order, 65% Before Dispatch, 5% after installation"}
    </p>
  </section>


  <!-- Bank Details -->
  <section class="mt-6">
    <h3 class="text-lg font-semibold text-[#0a4b78]">Payment Details:</h3>
    <p class="text-sm leading-relaxed">
      Payment can be made via Cheque / Netbanking.<br/>
      <strong>BANK DETAILS:</strong> IDFC FIRST BANK<br/>
      ACCOUNT NAME: SUNMAYO PRIVATE LIMITED<br/>
      ACCOUNT NO: 10223162147<br/>
      IFSC CODE: IDFB0021005<br/>
      BRANCH: SECTOR 15 GURGAON
    </p>
  </section>
</section>
<div style="page-break-before: always;"></div>

<!-- Terms & Conditions -->
    <img src="${API_URL}/assets/logo.png" class="h-16" />
<section class="mt-8 text-xl">
  <h2 class="text-2xl font-bold text-[#0a4b78]">Terms &</h2>
  <h3 class="text-xl font-semibold text-gray-800">Conditions</h3>
  <div class="h-0.5 w-12 bg-[#0a4b78] mt-1 mb-4"></div>

  <ul class="list-disc pl-6 text-sm text-gray-700 leading-relaxed space-y-1">
    <li>Packing is included in the offer.</li>
    <li>Transportation charges are in our scope.</li>
    <li>Civil and digging are in our scope.</li>
    <li>Price quotes are firm and valid for 10 days from the date of offer. After this period, reconfirmation from our office should be taken.</li>
    <li>Water supply at site will be provided by the customer free of cost during installation and commissioning.</li>
    <li>Closed, covered, locked stores will be provided by the customer during installation and commissioning.</li>
    <li>Approval process will start once order confirmation is received. From confirmation till 10 days before installation day 1, cancellation charges of INR 25,000 or 5% of system cost (whichever is higher) will apply.</li>
    <li>Delivery: 2–3 weeks from the date of technically and commercially cleared order.</li>
    <li>Force Majeure: This quotation and contract are subject to standard force majeure conditions.</li>
    <li>Includes licensing charges.</li>
  </ul>
</section>
<div style="page-break-before: always;"></div>

<div class="w-full h-screen relative font-sans">
 <!-- Logo -->
  <div class="absolute top-40 left-10">
   <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>
  <!-- Top Title Section -->
  <img src = "${API_URL}/assets/Panel-logo.png" alt="Solar Panel" class="h-16"/>

  <!-- Company Info -->
  <div class="absolute top-12 right-10 text-sm text-gray-700 space-y-2 max-w-[200px]">
    <p>Address: 26/18 Laxmi Garden, Sector 11,<br>Gurgaon, Haryana 122001</p>
    <p>Contact No: +919643800850</p>
    <p>Mail: info@sunmayo.com</p>
    <p>Visit us on: www.sunmayo.com</p>
  </div>


  <!-- Bottom Image -->
  <div class="absolute bottom-0 left-0 w-full">
    <img src="${API_URL}/assets/solar-panel.jpg" alt="Solar" class="w-full h-[250px] object-cover" />
  </div>
</div>



  </body>
  </html>
  `;
};

