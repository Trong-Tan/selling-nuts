// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/About`
  | `/Error`
  | `/Home`
  | `/Map`
  | `/Product`
  | `/Shop`
  | `/Shop/:productId`
  | `/login`

export type Params = {
  '/Shop/:productId' : {productId :string}
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
