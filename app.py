import streamlit as st
import pandas as pd
import gpd  # Nota: se der erro, mude para 'import geopandas as gpd'
from streamlit_folium import folium_static
import folium

# Configuração da página (Deve ser a primeira linha do Streamlit a ser executada)
PAGE_CONFIG = {"page_title": "Dashboard temático com Streamlit", "page_icon": ":heart:", "layout": "centered"}
st.set_page_config(**PAGE_CONFIG)

# Carregamento dos dados (feito uma única vez fora da função main para otimizar)
url_ext_mineral = 'cobranca_mineracao.geojson'
url_municipios = 'pr_mun.geojson'

polygons = gpd.read_file(url_ext_mineral)
points = gpd.read_file(url_municipios)

def main():
    st.title("Meu mapa de Mineração")
    st.subheader("Dados de área de mineração, calculados por município do Paraná")
    
    menu = ["Home", "Mapa"]
    choice = st.sidebar.selectbox('Menu', menu)
    
    if choice == 'Home':
        st.subheader("Página Inicial 1")
        
    elif choice == 'Mapa':
        st.subheader("Visualizar Mapa")

        # LINHA DE DIAGNÓSTICO TEMPORÁRIA:
        # Isso vai desenhar a tabela de dados na tela do seu app para você ver os nomes das colunas
        st.write("Colunas disponíveis no arquivo:", polygons.columns.tolist())
        st.dataframe(polygons.head(3))
        
        # O bloco 'with st.echo()' mostra o código na tela enquanto o executa. 
        with st.echo():
            # 1. Criar faixas de classificação (bins) baseadas nos seus dados
            myscale = polygons['cob_tot'].quantile([0, 0.25, 0.5, 0.75, 1]).tolist()
            
            # Criação do mapa com Folium
            m = folium.Map(location=[-25.5, -49.3], zoom_start=9)
            
            folium.Choropleth(
                geo_data=polygons.to_json(),  
                name='Áreas de Cobrança da Mineração',
                data=polygons,                
                columns=['objectid', 'cob_tot'], 
                key_on='feature.properties.objectid', 
                fill_color='YlOrRd',          
                fill_opacity=0.7,             
                line_opacity=0.2,             
                legend_name='Total de Cobrança da Mineração',
                bins=myscale,                 
                nan_fill_color='white',       
            ).add_to(m)
            
            folium.LayerControl().add_to(m)
            folium_static(m)

if __name__ == '__main__':
    main()
