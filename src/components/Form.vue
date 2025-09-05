<template>
  <div class="container py-4">
    <!-- 标题 -->
    <h1 class="display-5 fw-bold text-center mb-4 title-shadow">User Information Form</h1>

    <!-- 表单：用 Vue 自定义校验 -->
    <form @submit.prevent="submitForm">
      <div class="row g-3">
        <!-- Username -->
        <div class="col-md-6">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            v-model.trim="formData.username"
            :class="{ 'is-invalid': !!errors.username }"
            @blur="validateName(true)"
            @input="validateName(false)"
          />
          <div v-if="errors.username" class="text-danger small mt-1">
            {{ errors.username }}
          </div>
        </div>

        <!-- Password -->
        <div class="col-md-6">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model.trim="formData.password"
            :class="{ 'is-invalid': !!errors.password }"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger small mt-1">
            {{ errors.password }}
          </div>
        </div>

        <!-- Australian Resident -->
        <div class="col-md-6 d-flex align-items-center">
          <div class="form-check mt-2">
            <input
              id="isAustralian"
              type="checkbox"
              class="form-check-input"
              v-model="formData.isAustralian"
              :class="{ 'is-invalid': !!errors.resident }"
              @change="validateResident(true)"
            />
            <label class="form-check-label ms-2" for="isAustralian"> Australian Resident? </label>
            <div v-if="errors.resident" class="text-danger small mt-1">
              {{ errors.resident }}
            </div>
          </div>
        </div>

        <!-- Gender -->
        <div class="col-md-6">
          <label for="gender" class="form-label">Gender</label>
          <select
            id="gender"
            class="form-select"
            v-model="formData.gender"
            :class="{ 'is-invalid': !!errors.gender }"
            @change="validateGender(true)"
            @blur="validateGender(true)"
          >
            <option value="">Please select…</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <div v-if="errors.gender" class="text-danger small mt-1">
            {{ errors.gender }}
          </div>
        </div>

        <!-- Reason -->
        <div class="col-12">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            id="reason"
            class="form-control"
            rows="3"
            v-model.trim="formData.reason"
            :class="{ 'is-invalid': !!errors.reason }"
            @blur="validateReason(true)"
            @input="validateReason(false)"
          ></textarea>
          <div v-if="errors.reason" class="text-danger small mt-1">
            {{ errors.reason }}
          </div>
        </div>
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>

    <!-- 结果表格 -->
    <div class="table-responsive mt-5" v-if="rows.length">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Australian Resident</th>
            <th>Gender</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="i">
            <td>{{ r.username }}</td>
            <td>{{ r.password }}</td>
            <td>{{ r.isAustralian }}</td>
            <!-- true/false 会直接显示；需要 Yes/No 可改成 r.isAustralian ? 'Yes' : 'No' -->
            <td>{{ r.gender }}</td>
            <td>{{ r.reason }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/** 表单数据（Activity 3 建议用 ref 对象） */
const formData = ref({
  username: '',
  password: '',
  isAustralian: false, // 使用布尔
  gender: '',
  reason: '',
})

/** 错误消息对象：null 表示无错误，字符串表示错误文本 */
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

/** 提交记录（表格） */
const rows = ref([])

/* --- 校验函数们 --- */
const validateName = (blur) => {
  const name = formData.value.username.trim()
  if (name.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+,.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'Please tick this box.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const r = formData.value.reason.trim()
  if (r.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters.'
  } else {
    errors.value.reason = null
  }
}

/** 提交：统一触发所有校验（blur=true），全部通过再入表 */
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    rows.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: '',
  }
  // 清空错误
  Object.keys(errors.value).forEach((k) => (errors.value[k] = null))
}
</script>

<style scoped>
.title-shadow {
  text-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.table {
  border-collapse: separate;
  border-spacing: 0 10px;
}
thead th {
  border-bottom: 2px solid #e9ecef;
}
tbody tr {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}
tbody td {
  background: transparent;
}

/* 让 Bootstrap 的 is-invalid 在暗色边框下更明显（可选） */
.is-invalid {
  border-color: #dc3545 !important;
}
</style>
