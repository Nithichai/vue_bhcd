<template>
  <div class="row">
    <div class="col-md-8">
        <edit-profile-form :model="model"></edit-profile-form> 
    </div>
  </div>
</template>
<script>
  import EditPersonalInfoForm from './PersonalInfo/EditPersonalInfoForm';
  export default {
    components: {
      EditPersonalInfoForm,
    },
    data() {
      return {
        model: {
          name: 'Creative Code Inc.',
          surname: 'mike@email.com',
          phone: '+861111111',
          firstName: 'Mike',
          email: 'abc@email.com',
          job: 'Student',
          birthday: '19-12-2000',
        }
      }
    }
  }
</script>
<style>
</style>
