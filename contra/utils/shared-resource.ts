import { useState } from "react";
import { RELAY_DEV_SERVER } from "../constants";
import { SEA } from "../types";
import { getHash } from "./getHash";

interface AppKeys {
  epriv: string;
  priv: string;
  epub: string;
  pub: string;
}

export const createSharedResource = async (newGunInstance: any, sea: SEA) => {
  const keys = await sea.pair();
  const sharedKeyString = JSON.stringify(keys);
  let keyId = await getHash(sharedKeyString, sea);
  const nodeID = `${keyId}`;
  return new Promise(async (resolve) => {
    const newGun = newGunInstance({
      peers: [RELAY_DEV_SERVER],
      localStorage: false,
      radisk: true,
      file: nodeID,
    });

    newGun.on("auth", () => {
      // TODO: workaround while https://github.com/amark/gun/issues/937 is fixed
      // should not need a function
      const node = () => namespace.get(nodeID);

      resolve({
        node,
        shareKeys: {
          keyId,
          sharedKeyString,
          nodeID,
        },
        keys,
      });
    });

    const namespace = newGun.user();
    namespace.auth(keys);
  });
};

export const openSharedResource = async (
  nodeID: any,
  newGunInstance: any,
  keys: any,
  pub: any
) => {
  return new Promise((resolve) => {
    const newGun = newGunInstance({
      peers: [RELAY_DEV_SERVER],
      localStorage: false,
      radisk: true,
      file: nodeID,
    });
    let namespace: any;

    if (keys) {
      newGun.on("auth", () => {
        // TODO: workaround while https://github.com/amark/gun/issues/937 is fixed
        // should not need a function
        const node = () => namespace.get(nodeID);
        resolve(node);
      });
      namespace = newGun.user();
      namespace.auth(keys);
    } else {
      namespace = newGun.get(pub);
      const node = () => namespace.get(nodeID);
      resolve(node);
    }
  });
};

export const useSharedResource = (gun: any, sea: any) => {
  const [sharedResource, setSharedResource] = useState({
    node: null,
    shareKeys: null,
    keys: null,
  });
  const [isRetrieving, setIsRetrieving] = useState(false);

  async function getSharedResource() {
    const resource: any = await createSharedResource(gun, sea);
    setSharedResource(resource);
  }

  if (!sharedResource.node && !isRetrieving) {
    setIsRetrieving(true);
    getSharedResource();
  }

  return [sharedResource, setSharedResource];
};
