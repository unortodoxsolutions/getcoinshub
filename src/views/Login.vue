<template>
    <h3>You are being redirected</h3>
</template>

<script>
import { baseURL } from '@/api/client'

export const ROUTE_NAME = 'Login'

export default {
  name: ROUTE_NAME,
  data: () => ({}),
  mounted () {
    window.location = `${baseURL}/auth`
  }
}
</script>
