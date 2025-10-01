import { useState } from "react";


// Define team member type
interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

// Define team section type
type TeamSection = 'board' | 'management' | 'staff';

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<TeamSection>('board');

  // Team members data with proper typing
  const teamMembers: Record<TeamSection, TeamMember[]> = {
    board: [
      {
        name: "Rizindana Alain Christian",
        title: "Co-Founder & Chairman of the Board",
        description: "A visionary leader with over 10 years of experience in environmental science, waste management, and policy. Guides GreenCare’s long-term sustainability strategy.",
        image: "/images/team/alain.jpeg"
      },
      {
        name: "Nizeyimana Noel",
        title: "Co-Founder, Board Member & CEO",
        description: "Expert in soil management and compost production. Leads both strategy and daily operations, driving growth and partnerships.",
        image: "/images/team/noel.jpg"
      },
      {
        name: "Mizinduko Francis",
        title: "Co-Founder & Board Member",
        description: "Civil engineer specializing in infrastructure and compost facility design, ensuring operations meet top technical and sustainability standards.",
        image: "/images/team/francis.jpeg"
      },
      {
        name: "Iyakaremye Jean Paul",
        title: "Co-Founder & Board Member",
        description: "Agronomy specialist ensuring product quality and relevance for farmers, with a focus on soil health and agricultural impact.",
        image: "/images/team/jeanpaul.jpeg"
      }
    ],
    management: [
      {
        name: "Nizeyimana Noel",
        title: "CEO",
        description: "Overall leadership, growth strategy, and stakeholder engagement.",
        image: "/images/team/noel.jpg"
      },
      {
        name: "Umugwaneza Arlette",
        title: "Managing Director",
        description: "Oversees daily operations, HR, and Implementation.",
        image: "/images/team/arlette.jpg"
      },
      {
        name: "Tuyishime Sharom",
        title: "Marketing & Sales Officer",
        description: "Expands market reach, branding, and customer engagement.",
        image: "/images/team/sharom.jpg"
      },
      {
        name: "ISHIMWE Nshogoza Olivier",
        title: "IT, Impact & Communication Officer",
        description: "Leads communications, public relations, and sustainability reporting.",
        image: "/images/team/olivier.jpg"
      },
      {
        name: "Aline Umuziranenge",
        title: "Accountant",
        description: "Manages finances, compliance, and financial planning.",
        image: "/images/team/aline.jpg"
      },
      {
        name: "Felix Ntawukuriryayo",
        title: "Site Manager (Nduba Facility)",
        description: "Oversees compost production, workforce, and quality control.",
        image: "/images/team/felix.jpg"
      },
      {
        name: "Annualithe umuhoza",
        title: "Site Manager (Huye Recycling Facility)",
        description: "Oversees compost production, workforce, and quality control.",
        image: "/images/team/annualithe.jpg"
      }
    ],
    staff: [
      {
        name: "Frontline Staff",
        title: "Compost Production Team",
        description: "Our dedicated frontline staff are the heart of our operations, expertly managing waste sorting, composting, and packaging to ensure that every product meets our high standards of quality and sustainability. A significant portion of our team is composed of young men and women. At the Nduba Biowaste Processing Facility and the Huye Recycling Facility, 95% of our 30 permanent staff are youth, contributing to both environmental sustainability and youth empowerment.",
        image: "/images/team/staff.jpg"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/team/team.png" 
            alt="GreenCare Rwanda Workers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Team</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            At GreenCare Rwanda Ltd., our team is the driving force behind our mission. We are a dedicated group of leaders, professionals, and frontline staff, all united by a shared passion for creating a circular economy and promoting sustainable agriculture through high-quality compost production.
          </p>
        </div>
      </section>

      {/* Team Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-white p-1 shadow-md">
              <button
                onClick={() => setActiveTab('board')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'board' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Strategic Visionaries
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'management' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Operational Excellence
              </button>
              <button
                onClick={() => setActiveTab('staff')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'staff' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                The Engine of Production
              </button>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers[activeTab].map((member: TeamMember, index: number) => (
              <div 
                key={`${activeTab}-${index}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/default-avatar.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">{member.title}</p>
                  <p className="text-gray-700 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Team Philosophy</h2>
            <p className="text-lg text-gray-700 mb-8">
              At GreenCare Rwanda Ltd., we believe that our people are our greatest asset. Our diverse team brings together expertise from environmental science, engineering, agriculture, business, and technology – all working together to create sustainable solutions for Rwanda's waste management challenges.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We're committed to empowering youth through meaningful employment opportunities in the green economy. With 95% of our frontline staff being young Rwandans, we're not just transforming waste – we're transforming lives.
            </p>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Why Our Team Matters</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• We combine technical expertise with practical field experience</li>
                <li>• Our team is deeply rooted in Rwandan communities</li>
                <li>• We prioritize continuous learning and professional development</li>
                <li>• We foster a culture of innovation, collaboration, and environmental stewardship</li>
                <li>• We measure success not just by tons of waste processed, but by lives transformed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}