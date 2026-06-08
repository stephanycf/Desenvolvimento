import streamlit as st
import pandas as pd
from streamlit_folium import folium_static
import folium

PAGE_CONFIG = {"page_title":"Dashboard temático com Streamlit","page_icon":":heart:","layout":"centered"}
st.set_page_config(**PAGE_CONFIG)

# Carregamento dos dados
url_ext_mineral = 'https://raw.githubusercontent.com/stephanycf/Desenvolvimento/main/Extracao_Mineral_-_Mapeamento_por_radar_1_10.000_0.geojson'
url_municipios = 'https://raw.githubusercontent.com/stephanycf/Desenvolvimento/main/pr_mun.geojson'
polygons = gpd.read_file(url_ext_mineral)
points = gpd.read_file(url_municipios)

# Configuração da página
PAGE_CONFIG = {"page_title":"Dashboard temático com Streamlit", "page_icon":":heart:", "layout":"centered"}
st.set_page_config(**PAGE_CONFIG)

def main():
	st.title("Como adicionar mapas no StreamLit")
	st.subheader("Baseado num caderno do Colab")
	menu = ["Home","Mapa"]
	choice = st.sidebar.selectbox('Menu',menu)
	if choice == 'Home':
		st.subheader("Página Inicial 1")
	elif choice == 'Mapa':
		st.subheader("Visualizar Mapa")
		with st.echo():

#mapa com Foluim
		m = folium.Map (location = [-25.5,-49.3],zoom_start = 9)
	  folium.Choropleth(
        geo_data=bairros_finais.to_json(),
        name='Áreas de Extração Mineral',
        data=bairros_finais,
        columns=['OBJECTID', 'num_pto'],
        key_on='feature.properties.OBJECTID',
        fill_color='YlGn',
        legend_name='Extração Mineral'
    ).add_to(m)
    folium.LayerControl().add_to(m)
			folium_static(m)
	else:
		st.subheader("")
if __name__ == '__main__':
	main()
