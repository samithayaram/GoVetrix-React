import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'

export default function Contact() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="relative isolate bg-black text-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact sales</h2>
        <p className="mt-2 text-lg">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {['First name', 'Last name', 'Company', 'Email', 'Phone number'].map((label) => (
            <div key={label} className={label === 'Phone number' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-semibold">{label}</label>
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder={label}
                  className="block w-full rounded-md bg-white text-black px-3.5 py-2 text-base placeholder-gray-500 focus:outline-indigo-600"
                />
              </div>
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold">Message</label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white text-black px-3.5 py-2 text-base placeholder-gray-500 focus:outline-indigo-600"
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 cursor-pointer rounded-full bg-gray-600 p-px ring-1 ring-white transition-colors duration-200"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={`size-4 transform rounded-full bg-white transition duration-200 ${agreed ? 'translate-x-3.5' : ''}`}
                />
              </Switch>
            </div>
            <Label className="text-sm">By selecting this, you agree to our <a href="#" className="font-semibold text-indigo-400">privacy policy</a>.</Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}
