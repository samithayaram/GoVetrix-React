import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Label, Switch } from '@headlessui/react'

export default function Contact() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Remove error for the field on valid input
    setErrors((prev) => {
      const updated = { ...prev }
      if (name === 'email' && /\S+@\S+\.\S+/.test(value)) delete updated.email
      else if (name === 'phone' && /^[0-9]{10}$/.test(value)) delete updated.phone
      else if (value.trim()) delete updated[name]
      return updated
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (!agreed) newErrors.agreed = 'You must agree to the privacy policy'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      navigate('/contact-success')
    }
  }

  return (
    <div className="relative isolate bg-black text-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact Sales</h2>
        <p className="mt-2 text-lg">If you have any queries, feel free to contact us.</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {['firstName', 'lastName', 'company', 'email', 'phone'].map((field) => (
            <div key={field} className={field === 'phone' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-semibold capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <div className="mt-2.5">
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1')}
                  className={`block w-full rounded-md px-3.5 py-2 text-base placeholder-gray-500 outline-none ${
                    errors[field]
                      ? 'border border-red-400 ring-2 ring-red-400'
                      : 'bg-white text-black focus:ring-indigo-600 ring-2 ring-transparent'
                  }`}
                />
                {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
              </div>
            </div>
          ))}

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className={`block w-full rounded-md px-3.5 py-2 text-base placeholder-gray-500 outline-none ${
                  errors.message
                    ? 'border border-red-400 ring-2 ring-red-400'
                    : 'bg-white text-black focus:ring-indigo-600 ring-2 ring-transparent'
                }`}
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
          </div>

          <Field className="flex gap-x-4 sm:col-span-2 items-center">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`group flex w-8 cursor-pointer rounded-full p-px ring-1 transition-colors duration-200 ${
                agreed ? 'bg-indigo-600 ring-indigo-300' : 'bg-gray-600 ring-white'
              }`}
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className={`size-4 transform rounded-full bg-white transition duration-200 ${
                  agreed ? 'translate-x-3.5' : ''
                }`}
              />
            </Switch>
            <Label className="text-sm">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-400 underline">
                privacy policy
              </a>.
            </Label>
          </Field>
          {errors.agreed && <p className="text-red-400 text-sm sm:col-span-2">{errors.agreed}</p>}
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition"
          >
            Let’s talk
          </button>
        </div>
      </form>
    </div>
  )
}
