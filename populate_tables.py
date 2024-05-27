import random as r
import pandas as pd
import logging
import requests
import randomuser 
from datetime import datetime,timedelta,date
import os
from typing import List,Dict


host = "http://127.0.0.1:8000"

logging.basicConfig(level=logging.INFO)

def get_patients():
    endpoint = f"{host}/altapaciente"

    response= requests.get(url=endpoint)
    patients = response.json()
    if patients:
        patients = patients["message"]

    afiliados = [patient["numero_afiliado"] for patient in patients]
    return afiliados

def get_doctors():
    endpoint = f"{host}/altamedico"
    response= requests.get(url=endpoint)
    doctors = response.json()
    if doctors:
        doctors = doctors["medicos"]
    return [doctor["numero_matricula"] for doctor in doctors]

def get_radiologos():
    endpoint = f"{host}/radiologos"

    response= requests.get(url=endpoint)
    radiologos  = response.json()
    return [radiologo["numero_matricula"] for radiologo in radiologos ]


def choose_placa():
    folders = ["COVID","NORMAL","PNEUMONIA"]
    folder = r.choice(folders)
    placas=os.listdir(f"./{folder}/")
    placa = r.choice(placas)

    path = f"{folder}/{placa}"
    logging.info(f"{path}")
    return "./"+path


def cargar_placas():
    patients=get_patients()
    logging.info(f"cantidad de pacientes: {patients}")

    radiologists = get_radiologos()
    logging.info(f"cantidas de radiologos: {len(radiologists)}")


    doctors = get_doctors()
    logging.info(f"cantidad de doctores: {len(doctors)}")

    endpoint = f"{host}/subiradiografia"

    for i,patient in enumerate(patients):
        logging.info(f"Subiendo placa n {i}")
        medico = r.choice(doctors)
        radiologist = r.choice(radiologists)
       
        estudio = {
        "estudio":"Radiografia de torax",
        "fecha": date.today(),
        "numero_afiliado": patient,
        "descripcion":"description",
        "matricula_radiologo":radiologist,
        "matricula_medico":medico,
        
        }
        #choose random torax placa
        placa = choose_placa()
        placa = open(placa,"rb")

        response = requests.post(url=endpoint,data=estudio, files={"placa":placa})
        logging.info(f"RESPONSE {response}")


def get_diagnosticos():
    endpoint = f"{host}/diagnosticos"

    response= requests.get(url=endpoint)
    diagnosticos = response.json()
    return diagnosticos
    
def cargar_localidades():
    endpoint = f"{host}/api/v1/localidades/"
    df=pd.read_csv("MAPA/localidad_deptos_tucuman.csv")
    logging.info("Carga de localidades iniciada")
    for localidad in df["localidad"]:
        data={"nombre":localidad,
               "codigo_postal":str(4000),
               "provincia":1,
        }
        print(data)
        response = requests.post(data=data,url=endpoint)
        logging.info(response)
    logging.info("Carga de localidades finalizada")

def get_localidades() -> List[Dict]:
    endpoint = f"{host}/api/v1/localidades/"
    response = requests.get(url=endpoint)
    localidades = response.json()
    logging.info(f"{type(localidades)}")
    return localidades




def cargar_patients(n):
    endpoint = f"{host}/altapaciente"
    localidades=get_localidades()
    logging.info(f"{len(localidades)}")
    provincias=["TUCUMAN"]
    user_list = randomuser.RandomUser.generate_users(n,get_params={"nat":"es"})

    used_dni=[]
    for user in user_list:
        
        random_number =  str(r.randint(100,10000))
        dni=f"{random_number}{random_number[::-1][:3]}"
        
        while dni in used_dni:
            random_number =  str(r.randint(100,10000))
            dni=f"{random_number}{random_number[::-1][:3]}"
        else:
            used_dni.append(dni)

        street=user.get_street(split_number_name=True)["name"]
        localidad =  r.choice(localidades)
        provincia = r.choice(provincias)
        
        patient = {"dni": dni,
        "email": user.get_email() ,
        "nombre": user.get_first_name()  ,
        "apellido": user.get_last_name()  ,
        "domicilio": 1  ,
        "codigo_postal": str(4000),
        "telefono":r.randint(1000,10000),
        #"telefono": user.get_phone(strip_hyphens=True,strip_parentheses=True)  ,
        "fecha_nacimiento":date.today(),
        "fecha_alta ": date.today()   ,
        #"foto": user.get_picture(),
        "direccion": user.get_street(),
        "fecha_desde": date.today(),
        "fecha_hasta": date.today(),
        "localidad":localidad["nombre"],
        "provincia":provincia,
        "pais":"ARGENTINA",
        "entre_calle_sup": street,
        "entre_calle_inf": street,}

        response = requests.post(data=patient,url=endpoint)
        logging.info(response)
    return user_list


if __name__ == "__main__":
    import time
    

    n=1000
    
    #get_patients()
    cargar_placas()
    #cargar_patients(n=n)

    #choose_placa()

    #cargar_localidades()
    #localidades=get_localidades()
    #logging.info(f"{localidades}")
    