// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnfhfruvhjmoyhkkpies.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZmhmcnV2aGptb3loa2twaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MTYzNjcsImV4cCI6MjA0NTI5MjM2N30.S595w5LWkbrM3BKyOAZfZVZeXYA_9AAJw4rj4CUkyrw'
export const supabase = createClient(supabaseUrl, supabaseKey)
