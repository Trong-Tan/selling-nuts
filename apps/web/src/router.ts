// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/:productId`
  | `/About`
  | `/Cart`
  | `/Error`
  | `/Map`
  | `/Shop`
  | `/admin`
  | `/admin/components/Sidebar`
  | `/admin/dashboard`
  | `/admin/report`
  | `/admin/setting`
  | `/login`

export type Params = {
  '/:productId': { productId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
