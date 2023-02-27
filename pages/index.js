import { TextInput, Textarea, Button, Container, Group, Box} from "@mantine/core";
import {useForm} from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import useSWR from 'swr'
import fetcher from 'lib/fetcher.js'

export default function Home({ posts }) {
  const data = useSWR('/api/all', fetcher).data;
  const submitForm = useForm({
    initialValues:{
      email: '',
      event: '',
      points: '',
    },
    validate:{
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email Address')
    }
  });
  const handleSubmit = async values => {
    fetch(`/api/submit?email=${values.email}&event=${values.event}&points=${values.points}`)
    .then(result => {
      if(!result){
        showNotification({
          title:"Error submitting",
          color: "red",
          message: "Sorry there was an error submitting your request"
        })
        return;
      } else {
        showNotification({
          title:"Success submitting",
          color: "green",
          message: "I will get back to you as soon as possible"
        })
        submitForm.setValues({
          email: '',
          event: '',
          points: '',
        })
      }
    });
  }
  return (
    <div className="container mx-auto my-6 max-w-xl">
      <head>
        <title>Ambassador Heart Point Tracker</title>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <div className="p-5 min-h-screen bg-gray-100">
          <h1 className="text-2xl text-center font-bold text-gray-800 py-2">Ambassador Heart Point Tracker</h1>
          <Box mx="auto">
            <form onSubmit={submitForm.onSubmit(values => handleSubmit(values))}>
              <TextInput required label="Email" placeholder="youremail@student.shslou.org" {...submitForm.getInputProps('email')}/>
              <TextInput required label="Event Name" placeholder="Event Name" {...submitForm.getInputProps('event')}/>
              <TextInput required label="# of Points" placeholder="25" {...submitForm.getInputProps('points')}/>
              <Group position="center" mt="md">
                <Button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Submit</Button>
              </Group>
            </form>
          </Box>
                <table className="w-full">
                  <thead className="text-black border-b-2 border-gray-200">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">Event</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left"># of points</th>
                    </tr>
                  </thead>
                  <tbody>
                      {data?.map(post => (
                        <tr key={post.id}>
                          <td className="p-3 text-sm text-gray-700">{post.email}</td>
                          <td className="p-3 text-sm text-gray-700">{post.event}</td>
                          <td className="p-3 text-sm text-gray-700">{post.points}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-black font-bold">
                        <td className="p-3 text-sm text-gray-700">Total</td>
                        <td className="p-3 text-sm text-gray-700"></td>
                        <td className="p-3 text-sm text-gray-700">{data?.map(i => i.points).reduce((p,n) => p+n)}</td>
                      </tr>
                  </tbody>
                </table>
        </div>
      </body>
    </div>
  )
}