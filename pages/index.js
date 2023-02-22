import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import getPosts from '../lib/getPosts';
import { TextInput, Textarea, Button, Container, Group, Box} from "@mantine/core";
import {useForm} from "@mantine/form";
import { showNotification } from '@mantine/notifications';

export default function Home({ posts }) {
  const submitForm = useForm({
    initialValues:{
      email: '',
      event: '',
      points: '',
    },
    validate:{
      email: value => (/^\S+@\S+$/.test(value) ?null : 'Invalid Email Address')
    }
  });
  const handleSubmit = async values => {
    const request = await fetch('/api/submit',{
      method: 'POST',
      body: JSON.stringify(values)
    });
    const result = await request.json();

    if(result.data != 'ok'){
      showNotification({
        title:"Error submitting",
        color: "red",
        message: "Sorry there was an error submitting your request"
      })
      return; 
    }
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
  return (
    <div class="container mx-auto my-6 max-w-xl">
      <head>
        <title>Ambassador Heart Point Tracker</title>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <div class="p-5 h-screen bg-gray-100">
          <h1 class="text-2xl text-center font-bold text-gray-800 py-2">Ambassador Heart Point Tracker</h1>
          <Box mx="auto">
            <form onSubmit={submitForm.onSubmit(values => handleSubmit(values))}>
              <TextInput required label="Email" placeholder="youremail@student.shslou.org" {...submitForm.getInputProps('email')}/>
              <TextInput required label="Event Name" placeholder="Event Name" {...submitForm.getInputProps('event')}/>
              <TextInput required label="# of Points" placeholder="25" {...submitForm.getInputProps('points')}/>
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
                <table class="w-full">
                  <thead class="big-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th class="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                      <th class="p-3 text-sm font-semibold tracking-wide text-left">Event</th>
                      <th class="p-3 text-sm font-semibold tracking-wide text-left"># of points</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white">
                      {posts.map(post => (
                        <div key={post.id}>
                          <td class="p-3 text-sm text-gray-700">{post.fields.email}</td>
                          <td class="p-3 text-sm text-gray-700">{post.fields.event}</td>
                          <td class="p-3 text-sm text-gray-700">{post.fields.points}</td>
                        </div>
                      ))}
                      </tr>
                  </tbody>
                </table> 
        </div>
      </body>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
