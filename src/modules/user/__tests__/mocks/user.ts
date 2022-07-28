export const USER_DATA_PAYLOAD_MOCKS = [
  {
    "id": "0a1c5729-187e-47fc-988c-dc947c30dbf1",
    "firstName": "Adam",
    "lastName": "Malysz",
    "email": "email@adam.co",
    "password": "$argon2id$v=19$m=4096,t=3,p=1$1kPVSWSzw2mnBtQtJwFaFw$euoAYiM3ZOenSTyqia/qX+axJIn/qrr9vXcT8J+lYok",
    "role": "user",
    "verificationCode": null,
    "passwordResetCode": null,
    "verified": false,
    "created_at": "2022-07-28T18:58:19.243Z",
    "updated_at": "2022-07-28T18:58:19.243Z"
  }
]

export const USER_ID_MOCKS = [
  "0a1c5729-187e-47fc-988c-dc947c30dbf1"
]

export const NOT_FOUND_PAYLOAD_MOCK = {
  status: 404,
  name: "NotFoundError",
  message: "User not found"
}