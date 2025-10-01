import { useState } from "react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<"overview" | "mission" | "impact" | "business-model">("overview");
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 pt-16"> </div>
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/team/bar.jpg" 
            alt="GreenCare Rwanda Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Pioneering sustainable waste management solutions for a greener Rwanda
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-50 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'mission', label: 'Mission & Vision' },
              { id: 'impact', label: 'Impact Journey' },
              { id: 'business-model', label: 'Business Model' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === tab.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">

        {/* ================== Overview Section ================== */}
        {activeSection === 'overview' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-green-800 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Greencare Rwanda Ltd. is dedicated to pioneering sustainable waste management solutions. We specialize in providing expert consultancy for waste audits and planning, alongside the design and construction of state-of-the-art composting and recycling infrastructure.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our core mission is to transform biowaste into high-quality organic fertilizer, branded as Grekompost, and to efficiently process recyclable materials. Founded by passionate University of Rwanda graduates, we've grown from a campus initiative to a leading force in Rwanda's circular economy.
                </p>
                
                {/* Button to show information card */}
                <button 
                  onClick={() => setShowCard(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 mb-6"
                >
                  Learn More About Our Journey →
                </button>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Our Commitment</h3>
                  <p className="text-gray-700">
                    We are committed to creating a cleaner and more sustainable future through effective waste management solutions that benefit our environment, communities, and economy.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/images/team/staff.jpg" 
                  alt="GreenCare Team Collaboration"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="/images/team/grekompost.png" 
                    alt="Grekompost Product"
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              </div>
            </div>

            {/* Founders */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-green-800 text-center mb-12">Meet Our Founders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Ruzindana Alain Christian",
                    role: "Co-Founder & Chairman",
                    image: "/images/team/alain.jpeg",
                    bio: "Expert in environmental science and waste management composting systems. Provides governance, accountability, and strategic oversight, ensuring GreenCare’s long-term sustainability and ethical growth."
                  },
                  {
                    name: "Nizeyimana Noel",
                    role: "Co-Founder & CEO",
                    image: "/images/team/noel.jpg",
                    bio: "Entrepreneur, consultant in solid waste management and composting production, business growth, and partnerships, driving scalability, innovation, and community impact across GreenCare’s operations."
                  },
                  {
                    name: "Mizinduko Francis",
                    role: "Co-Founder",
                    image: "/images/team/francis.jpeg",
                    bio: "Civil engineer with expertise in sustainable infrastructure and compost facility design. Ensures technical excellence, operational efficiency, and resilience in GreenCare’s infrastructure development."
                  },
                  {
                    name: "Iyakaremye Jean-Paul",
                    role: "Co-Founder",
                    image: "/images/team/jeanpaul.jpeg",
                    bio: "Agronomist specializing in soil health and agricultural innovation. Guarantees product quality, farmer-centered solutions, and agricultural impact, strengthening GreenCare’s role in food security."
                  }
                ].map((founder, index) => (
                  <div key={index} className="text-center">
                    <div className="relative inline-block mb-4">
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">{founder.name}</h3>
                    <p className="text-green-600 font-semibold mb-2">{founder.role}</p>
                    <p className="text-gray-700 text-sm">{founder.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================== Mission & Vision Section ================== */}
        {activeSection === 'mission' && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-4xl font-bold text-green-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                GreenCare Rwanda Ltd. is dedicated to advancing sustainable waste management by providing expert consultancy, developing innovative composting and recycling infrastructure, and delivering capacity-building programs that create green jobs. Through the transformation of biowaste into high-quality Grekompost and the recovery of recyclables, we strive to reduce landfill dependency by 95%, promote circular economy practices, and build cleaner, healthier, and more resilient communities.
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-1 bg-green-600"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl shadow-lg p-8">
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                To be the premier leader in waste management consultancy, renowned for designing and constructing state-of-the-art composting and recycling infrastructure. We aspire to transform biowaste into high-quality Grekompost and efficiently process recyclables, thereby achieving an exceptional 95% landfill diversion rate.
              </p>
            </div>
          </div>
        )}

        {/* ================== Impact Journey Section ================== */}
        {activeSection === 'impact' && (
          <div className="max-w-5xl mx-auto">
            {/* Impact Journey Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-green-700 via-green-800 to-emerald-500 text-white p-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">GreenCare Rwanda Ltd. – Impact Journey</h2>
                <p className="text-xl opacity-90 mt-2">8-Year Impact (2016–2024) & 10-Year Vision</p>
              </div>

              {/* Body Content */}
              <div className="p-8 space-y-10">

                {/* 8-Year Impact Section */}
                <section>
                  <div className="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                    <h3 className="text-2xl font-extrabold text-green-800">8-Year Impact (2016–2024)</h3>
                  </div>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    GreenCare has made a significant impact in waste management, environmental sustainability, and community livelihoods. Here are the key achievements:
                  </p>
                  <ul className="space-y-3 pl-5 text-gray-700 list-disc ml-4">
                    <li><strong>Waste Diversion:</strong> Composted 20,000 tons of organic waste, preventing it from going to landfills.</li>
                    <li><strong>Compost Production:</strong> Produced and sold 5,000 tons of compost, enhancing soil fertility across 5 districts.</li>
                    <li><strong>Farmer Support:</strong> Supported 3,500 farmers by providing compost, which boosted crop yields by up to 15%.</li>
                    <li><strong>Carbon Footprint Reduction:</strong> Prevented 30,000 tons of CO₂ equivalent emissions through composting.</li>
                    <li><strong>Job Creation:</strong> Created 25 direct and indirect green jobs, benefiting youth and women.</li>
                    <li><strong>Partnerships:</strong> Collaborated with local governments, NGOs, and private businesses to bolster Rwanda’s circular economy.</li>
                  </ul>
                </section>

                {/* Divider */}
                <div className="border-t border-dashed border-green-300 my-6"></div>

                {/* 10-Year Vision Section */}
                <section>
                  <div className="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h3 className="text-2xl font-extrabold text-green-800">10-Year Vision (Looking Ahead)</h3>
                  </div>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    GreenCare aims to expand its operations and amplify its impact in the next decade:
                  </p>
                  <ul className="space-y-3 pl-5 text-gray-700 list-disc ml-4">
                    <li><strong>Waste Management Expansion:</strong> Scale the business model in the city of Kigali, treating 50% of the biowaste generated and other secondary and satellite cities.</li>
                    <li><strong>Compost Production:</strong> Produce and distribute 16,000 tons of compost to farmers nationwide annually.</li>
                    <li><strong>Agricultural Transformation:</strong> Improve soil fertility on 400 hectares of farmland, contributing to Rwanda’s food security.</li>
                    <li><strong>Climate Action:</strong> Reduce or offset 24,000 tons of CO₂ equivalent emissions through sustainable waste solutions.</li>
                    <li><strong>Green Jobs:</strong> Create 100 decent jobs for youth and women in waste management.</li>
                    <li><strong>Sustainable Cities:</strong> Partner with the government and the private sector to establish smart, integrated waste management hubs across the country.</li>
                  </ul>
                </section>
              </div>

              {/* Footer Accent */}
              <div className="bg-green-50 px-8 py-6 text-center border-t border-green-100">
                <p className="text-green-800 font-medium">
                  Building a greener, healthier, and more sustainable Rwanda — one ton of waste at a time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================== Business Model Section ================== */}
        {activeSection === 'business-model' && (
          <div className="max-w-6xl mx-auto">
            {/* Business Model Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800 mb-6">Our Business Model</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                An integrated and scalable strategy for biowaste management that combines profitability with sustainability.
              </p>
            </div>

            {/* Semi-Mechanized Windrow Composting */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src="/images/team/composting.jpg" 
                  alt="Composting Process"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-800 mb-6">Semi-Mechanized Windrow Composting</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We have successfully designed and piloted a semi-mechanized windrow composting method that is both economically viable and profitable. Our system processes a minimum of 15 tons of organic waste daily to ensure profitability while maintaining high-quality standards.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    Economically viable and scalable approach
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    Processes 15+ tons of organic waste daily
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    Ensures consistent quality control
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3">✓</span>
                    Designed for replication across Rwanda
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Model Impact Stats Cards */}
            <h2 className="text-4xl font-bold text-green-800 text-center mb-12">Our Business Model Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  number: "960+",
                  label: "Tons of High-Quality Grekompost",
                  description: "Produced annually to enrich soil health and support sustainable agriculture.",
                  icon: "🌱"
                },
                {
                  number: "192 ha",
                  label: "Land Saved Annually",
                  description: "From landfill use, preserving valuable space and preventing environmental degradation.",
                  icon: "🏞️"
                },
                {
                  number: "480+",
                  label: "Farmers Benefited",
                  description: "Directly supported through access to high-quality organic fertilizers.",
                  icon: "👨‍🌾"
                },
                {
                  number: "7,200 t",
                  label: "CO₂ Reduced Annually",
                  description: "Greenhouse gas emissions prevented through our waste management processes.",
                  icon: "🌍"
                },
                {
                  number: "20+",
                  label: "Green Jobs Created",
                  description: "Permanent positions empowering youth and building local expertise.",
                  icon: "💼"
                },
                {
                  number: "95%",
                  label: "Landfill Diversion Rate",
                  description: "Waste diverted from landfills through our comprehensive recycling programs.",
                  icon: "♻️"
                }
              ].map((impact, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{impact.icon}</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{impact.number}</div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">{impact.label}</h3>
                  <p className="text-gray-700">{impact.description}</p>
                </div>
              ))}
            </div>

            {/* Community Service */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Community Service</h3>
              <p className="text-lg text-gray-700 text-center mb-4">
                Serves 6,696 households or 26,786 individuals generating 15 tons of waste per day
              </p>
              <p className="text-gray-700 text-center">
                Our operations ensure that communities have safer, cleaner, and healthier environments while promoting sustainable living practices.
              </p>
            </div>

            {/* Why Our Model Matters - At the Bottom */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Our Model Matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4">Environmental Protection</h4>
                  <p className="text-gray-100 leading-relaxed">
                    We powerfully promote environmental protection through our comprehensive solid waste management strategy. By diverting 95% of waste from landfills, we directly combat environmental degradation and mitigate greenhouse gas emissions.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4">Market Demand & Growth</h4>
                  <p className="text-gray-100 leading-relaxed">
                    Our success in producing 960 tons of Grekompost annually and benefiting 480 farmers indicates strong market demand for eco-friendly solutions. This reflects a growing understanding that environmental stewardship is both an ethical choice and a practical investment in national well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Information Card Modal */}
      {showCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={() => setShowCard(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 transition-transform duration-200 z-10" 
                onClick={() => setShowCard(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 rounded-t-2xl">
                <h2 className="text-3xl font-bold text-white">Greencare Rwanda Ltd.: Pioneering Sustainable Waste Management and compost production for a Greener Future of Rwanda</h2>
                <p className="text-white opacity-90 mt-2">Transforming biowaste into solutions for a greener future of Rwanda</p>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m5 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h2" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Greencare Rwanda Ltd</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed ml-14">
                      Greencare Rwanda Ltd. stands at the forefront of transforming waste management, driven by a powerful mission to advance sustainable practices through expert consultancy, innovative infrastructure development, and impactful training programs. Their vision is to be the premier leader in waste management solutions, renowned for their ability to convert biowaste into high-quality Grekompost and efficiently process recyclables, ultimately achieving an exceptional 95% landfill diversion rate.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Our Story: The Greencare Rwanda Ltd. Journey</h3>
                    </div>
                    <div className="ml-14 space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-green-700">Founding Story:</h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          Greencare Rwanda Ltd. was established in July 2016 and brainchild of four ambitious entrepreneurs by Mr. Noel Nizeyimana CEO of Greencare Rwanda Ltd and co-founder, Mr. Christian Alain Ruzindana Chairman of the Board and Co Founder, Member of the Board and co-founder Mr Francis Mizinduko and Member of the Board and co-founder Mr. united by their shared vision and diverse expertise in soil and environmental management, civil engineering, and crop science, they graduated from the University of Rwanda in 2015 with a burning desire to revolutionize waste management and Agricultural production in Rwanda.
                        </p>
                      </div>
                      
                      <p className="text-gray-700 text-lg leading-relaxed">
                        The company was born from a powerful inspiration to tackle Rwanda's pressing solid waste management challenge and issue of the soil acidity of Rwanda. Witnessing the environmental degradation caused by improper waste disposal and recognizing the untapped potential within biowaste, our founders were driven to create sustainable solutions. Their vision was to transform what was considered waste into a valuable resource, thereby fostering a circular economy, promoting economic growth, and enhancing community well-being.
                      </p>
                      
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Despite the clear need for such services, the initial phase was fraught with challenges. Securing adequate funding, navigating the nascent regulatory landscape for waste management, and educating communities about the benefits of composting and recycling demanded immense perseverance. However, early achievements, such as the successful small-scale piloting of our composting methods and positive feedback from initial community partners, provided the crucial momentum and validation needed to propel Greencare Rwanda Ltd. forward.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">The Genesis of an Idea</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed ml-14">
                      Their entrepreneurial journey began during their undergraduate studies, where they observed the dire state of waste management in Huye city. Poorly organized collection services, unhygienic disposal methods, and the resulting health and environmental threats – from diseases and foul odors to water source contamination and hazardous exposure for waste collectors – painted a stark picture. This critical need ignited their commitment to transforming Rwanda's waste management landscape, moving beyond the conventional 'landfilling' model towards industrial recycling.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Greencare Rwanda Ltd.: From Concept to Reality</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed ml-14">
                      Greencare Rwanda Ltd officially registered in 2016 and licensed by the Rwanda Development Board (RDB) and Rwanda Utility and Regulations Authority (RURA) in 2017, Greencare Rwanda Ltd. was established to provide innovative solutions. In collaboration with the Huye District, the founders worked diligently to develop sustainable waste management strategies.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Innovative Solutions: Turning Waste into Value</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed ml-14">
                      Greencare Rwanda Ltd. has pioneered unique methods for waste transformation and packaged compost branded Grekompost.
                    </p>
                    
                    <div className="ml-14 mt-4">
                      <h4 className="text-xl font-bold text-green-700">Grekompost:</h4>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Recognizing that 75% of the waste they receive is biodegradable, Greencare Rwanda Ltd. employs a sophisticated windrow composting system to convert this organic matter into high-quality compost, branded as 'Grekompost'.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Evolution of Services/Products:</h3>
                    </div>
                    <div className="ml-14 space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2015: The Seed of an Idea: Grekompost is Born :</h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          The journey of Greencare Rwanda Ltd. began with a critical observation: the challenge of declining soil fertility and the urgent need for sufficient organic fertilizers to enrich humus levels as Rwandan soil 75% is acidic soil. Recognizing the limitations of traditional livestock manure – its inability to cover Rwanda's vast cultivated lands and its vulnerability to nutrient loss from rainfall and sun exposure – the team identified a groundbreaking opportunity. They saw biowaste as a readily available and sustainable source of raw materials for compost production and the existing model for solid waste management in the city was collection, transport and landfill which can cause environmental health issues. This insight led to the development of an innovative solution: the creation of high-quality, packaged compost, branded as 'Grekompost'. This product ensured consistent nutrient content and superior quality for farmers, addressing the deficiencies of traditional methods. The compost is meticulously developed using a windrow composting system, resulting in a mature, stable final product with recognized nutrient content that is continuously being improved and now reached to the semi mechanized windrow system which will lead to the full automatized composting system.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2023: A Holistic Approach From Product to Infrastructure :</h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          The growth trajectory of Greencare Rwanda Ltd. was further propelled by the understanding that producing exceptional compost required more than just a product; it demanded efficient infrastructure. This realization led the company to expand its expertise into consulting services for the design, construction, and operation of waste management facilities. Their aim is to contribute to the development of infrastructure that guarantees high-quality product output, underpins the success of their business model, and champions sustainable waste management practices that yield impactful products.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-1.5-2.732-1.5S8.27.667 7.5 1.5L3.268 14c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Challenges and the Path Forward</h3>
                    </div>
                    <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                      <li><strong>Sorting at the source:</strong> Treating mixed waste presents significant challenges, often increasing production costs and compromising the quality of the final products.</li>
                      <li><strong>Stakeholder Inclusivity:</strong> Ensuring all relevant stakeholders are involved in implementing solid waste management strategies remains a hurdle.</li>
                      <li><strong>Funding and Policy:</strong> The lack of a proprietary funding model and supportive government policies for integrated solid waste management and organic fertilizers hinders large-scale development. They advocate for policies that regularize organic fertilizers, similar to chemical ones, to promote 'Made in Rwanda' products and establish clear market support and distribution channels.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Key Milestones: Charting a Course for Sustainable Impact</h3>
                    </div>
                    <div className="ml-14 space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2016:</h4>
                        <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 ml-4">
                          <li>Introduction of the name "Greencare Rwanda Ltd." and the slogan "Our Environment, Our Concern," reflecting our commitment to environmental stewardship.</li>
                          <li>Official registration of Greencare Rwanda Ltd., marking the formal establishment of the company.</li>
                          <li>Establishment of the initial composting facility at Huye, Mukura sector, and the Mpare site, where waste from the Huye District was previously disposed of. This pilot project laid the foundation for our innovative approach.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2017:</h4>
                        <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 ml-4">
                          <li>Relocation of the composting site from the Mpare site to the Sovu Industrial Park, signifying a move toward a more modern and scalable recycling facility.</li>
                          <li>The commencement of operations at Sovu Industrial Park, facilitated by a Memorandum of Understanding (MOU) between Greencare Rwanda Ltd. and the Huye District, solidifying our partnership in waste management.</li>
                          <li>Launch of our inaugural line of organic fertilizers derived from biowaste, branded as "Grekompost," marking the introduction of our signature product.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2018:</h4>
                        <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 ml-4">
                          <li>Expansion of our services to the Nyanza District, with the establishment of a small composting facility.</li>
                          <li>Provision of support to the Nyanza District in evaluating the functionality of the Feacal Sludge Treatment and Solid Waste Management facility constructed under the WATSAN project. The facility's design was found to not fully meet the market's demand for compost and feacal sludge products, and recommendations for improvement were provided to the District and WASAC (Water and Sanitation Corporation) to enhance performance.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2023:</h4>
                        <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 ml-4">
                          <li>Successful bid by Greencare Rwanda Ltd. for the design, construction, and operation of the Nduba Biowaste Processing facility, secured through a contract with the Global Green Growth Institute (GGGI), the Ministry of Environment, and the City of Kigali. This project represented a significant step towards large-scale sustainable waste management.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-green-700">2025:</h4>
                        <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 ml-4">
                          <li>Signing of a Memorandum of Understanding (MOU) with WASAC (Water and Sanitation Corporation) for the management of the Nduba Biowaste Processing facility, further strengthening our commitment to effective waste management solutions.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
          
        
      </div>
    
  )};
</div>
  )
}