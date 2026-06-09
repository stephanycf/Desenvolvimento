import streamlit as st
import pandas as pd
import geopandas as gpd  # Corrigido: Faltava importar o geopandas
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
        # Toda a indentação interna dele foi corrigida.
        with st.echo():
            # Criação do mapa com Folium
			import folium

			# 1. (Opcional) Criar faixas de classificação (bins) baseadas nos seus dados
			# Isso evita que o Folium se perca caso haja valores muito discrepantes (outliers)
			myscale = polygons['cob_tot'].quantile([0, 0.25, 0.5, 0.75, 1]).tolist()
            m = folium.Map(location=[-25.5, -49.3], zoom_start=9)
            
            folium.Choropleth(
				geo_data=polygons.to_json(),  
				name='Áreas de Cobrança da Mineração',
				data=polygons,                
				columns=['objectid', 'cob_tot'], # 'objectid' une ao GeoJSON, 'cob_tot' dita a cor
				key_on='feature.properties.objectid', # Verifique se 'objectid' existe nas propriedades do GeoJSON
				fill_color='YlOrRd',          # Mudado para Amarelo/Laranja/Vermelho (ótimo para valores/cobranças)
				fill_opacity=0.7,             # Opacidade do preenchimento
				line_opacity=0.2,             # Opacidade das linhas de borda
				legend_name='Total de Cobrança da Mineração',
				bins=myscale,                 # Aplica as classes que calculamos acima
				nan_fill_color='white',       # Cor para regiões sem dados na coluna cob_tot
			).add_to(m)
            
            folium.LayerControl().add_to(m)
            folium_static(m)

if __name__ == '__main__':
    main()
