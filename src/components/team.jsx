import { Link } from "react-router-dom";

const people = [
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];
  
  export default function Team() {
    return (
      <div className="bg-black py-16 px-6 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Text Section */}
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white lg:text-3xl text-center">
              Meet our leadership
            </h2>
            <p className="mt-4 text-lg text-white text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem modi quibusdam molestias nulla ad est, optio sint, similique ipsam ab officia quae excepturi cum non tenetur magni quisquam. Eos, qui?
              Nostrum quae perspiciatis modi consectetur qui sed, distinctio illo dolore sit facere cupiditate excepturi ut, itaque exercitationem nam delectus. Fuga et at dolorem sed alias. Beatae assumenda ducimus quibusdam quas?
              Officiis, pariatur ut? Ab eius voluptatibus!
            </p>
            <div className="mt-6 flex justify-center">
          <Link to="/contact" className="bg-[#4dfad4] px-6 py-3 text-black rounded-md hover:bg-[#22f0c3] transition font-bold text-center w-full md:w-auto">
            Contact me
          </Link>
        </div>
          </div>
          {/* Images Section */}
          <div className="grid grid-cols-2 gap-6">
            {people.map((person, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img alt={person.name} src={person.imageUrl} className="w-32 h-32 rounded-full" />
                <h3 className="mt-2 text-sm font-semibold text-white">{person.name}</h3>
                <p className="text-xs font-semibold text-indigo-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  